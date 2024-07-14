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
  return result.slice(0, 10);
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

  private outputDir = './imageSnapshots-new';

  async init() {
    this.browser = await chromium.launch({
      headless: false,
    });
    this.context = await this.browser.newContext({
      viewport: { width: 800, height: 600 },
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
    // 每个不同主题需要单独截图，可否截屏到一起呢
    const pageUrl = `http://localhost:8001/~demos/${mdPath}?theme=default&css-var-enabled=1`;
    await page.goto(pageUrl);
    // 需要禁用掉页面中的各种采集和埋点请求，避免干扰
    await page.waitForLoadState('networkidle');

    // 禁用掉所有的动画
    await page.addStyleTag({
      content: '*{animation: none!important;}',
    });

    await page.waitForSelector('.dumi-antd-demo-layout');
    // Get scroll height of the rendered page and set viewport
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewportSize({ width: 800, height: bodyHeight });

    // 保存截图到 ./result 目录
    await page.screenshot({
      path: path.join(this.outputDir, `${mdPath}.png`),
      scale: 'device',
      type: 'png',
      fullPage: true,
      timeout: 3000,
    });

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
