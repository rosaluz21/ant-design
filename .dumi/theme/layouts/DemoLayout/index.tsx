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
  const visualDiffMode = params.get('visual-diff-mode');
  const cssVarMode = params.get('css-var-enabled');

  if (visualDiffMode) {
    return (
      <>
        {Object.entries(themes).map(([key, algorithm]) => {
          const configTheme = {
            algorithm,
            token: {
              fontFamily: 'Arial',
            },
          };

          return (
            <div
              className="dumi-antd-demo-layout"
              style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }}
              key={key}
            >
              <ConfigProvider theme={{ ...configTheme, cssVar: !!cssVarMode }}>
                {outlet}
              </ConfigProvider>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="dumi-antd-demo-layout" style={{ background: '', padding: `24px 12px` }}>
      {outlet}
    </div>
  );
};

export default DemoLayout;
