import { useOutlet, useSearchParams } from 'dumi';
import React from 'react';
import { ConfigProvider, theme } from '../../../../components';

const themes = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

const DemoLayout: React.FC = () => {
  const outlet = useOutlet();

  const [params] = useSearchParams();
  const currentTheme = params.get('theme')! as keyof typeof themes;
  const cssVarMode = params.get('css-var-enabled');
  return (
    <div
      className="dumi-antd-demo-layout"
      style={{ background: currentTheme === 'dark' ? '#000' : '', padding: `24px 12px` }}
    >
      <ConfigProvider theme={{ ...themes[currentTheme], cssVar: !!cssVarMode }}>
        {outlet}
      </ConfigProvider>
    </div>
  );
};

export default DemoLayout;
