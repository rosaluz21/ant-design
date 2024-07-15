import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Principal',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Promociones',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Social',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;
