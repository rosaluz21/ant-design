/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';

import fse from 'fs-extra';
import { createServer } from 'http-server';
import { chromium } from 'playwright-chromium';
import type { Browser, BrowserContext } from 'playwright-chromium';

async function getAllComponentMds() {
  const { glob } = await import('glob');
  const mds = await glob('components/!(overview|_util)/demo/*.md', {
    cwd: path.join(process.cwd()),
    dot: false,
  });

  // ~demos/components-button-demo-basic
  const result = mds.map((p) => p.replace('.md', '').replace(/\//g, '-'));
  return result;
}

async function createSiteServer() {
  const port = 3000;
  const server = createServer({ root: path.join(process.cwd(), '_site') });
  server.listen(port);
  return server;
}

class BrowserAuto {
  private browser: Browser | null = null;

  private context: BrowserContext | null = null;

  private outputDir = './imageSnapshots';

  async init() {
    this.browser = await chromium.launch({
      headless: true,
    });
    this.context = await this.browser.newContext({
      // 实测 iPhone SE 的屏幕尺寸最合适
      // viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
    });

    await fse.ensureDir(this.outputDir);
    await fse.emptyDir(this.outputDir);

    const errorFilePath = path.join(this.outputDir, 'error.jsonl');
    await fse.ensureFile(errorFilePath);
    await fse.writeFile(errorFilePath, '');
  }

  async appendErrorLog(errorData: any) {
    const errorFilePath = path.join(this.outputDir, 'error.jsonl');
    const errorLine = JSON.stringify({
      ...errorData,
      timestamp: new Date().toISOString(),
    });
    await fs.promises.writeFile(errorFilePath, `${errorLine}\n`);
  }

  // 执行截屏
  async captureScreenshots(mdPath: string) {
    if (!this.context) return;

    const page = await this.context.newPage();
    const pageUrl = `http://localhost:3000/~demos/${mdPath}`;
    console.log(pageUrl, 'pageUrl');
    await page.goto(pageUrl);
    // 需要禁用掉页面中的各种采集和埋点请求，避免干扰
    await page.waitForLoadState('networkidle');

    // 禁用掉所有的动画
    await page.addStyleTag({
      content: '*{animation: none!important;}',
    });

    // 保存截图到 ./result 目录
    await page.screenshot({ path: path.join('./result', `${mdPath}.png`) });

    return page?.close();
  }

  // 关闭浏览器
  async close() {
    await this.browser?.close();
  }
}

(async () => {
  const server = await createSiteServer();

  console.log(`Debug mode: ${!!process.env.DEBUG}`);

  const handler = new BrowserAuto();
  await handler.init();
  const mdPaths = await getAllComponentMds();
  const task = async (file: string) => {
    try {
      await handler.captureScreenshots(file);
    } catch (err) {
      const errorData = {
        filename: file,
        error: (err as Error).message,
      };
      await handler.appendErrorLog(errorData);
    }
  };

  const { default: pAll } = await import('p-all');

  // 增加并发
  await pAll(
    mdPaths.map((mdPath, i) => async () => {
      console.log(`处理 ${i + 1}/${mdPaths.length}: ${mdPath}`);
      return task(mdPath);
    }),
    { concurrency: 3 },
  );
  await handler.close();

  server.close();
})();
