import * as React from 'react';
import { useSink } from 'redux-sink';

import { DeviceType } from '@models/common';
import { BreakpointSink, LayoutSink } from '@sinks/common';
import { Layout, Menu } from 'antd';

import * as styles from './app-header-menu.module.scss';

export interface AppHeaderMenuProps {
  selectedKeys: Array<string>;
}

export const AppHeaderMenu: React.FunctionComponent<AppHeaderMenuProps> = ({ selectedKeys }) => {
  const breakPoint = useSink(BreakpointSink, (sink) => [sink.deviceType]);
  const layout = useSink(LayoutSink);
  const headerMenuStyle = breakPoint.deviceType === DeviceType.Desktop ? styles.headerMenuLg : styles.headerMenuSm;

  return (
    <Layout.Header style={{ background: '#fff', padding: 0 }} className={headerMenuStyle}>
      <Menu theme={'light'} mode={'horizontal'} className={headerMenuStyle} selectedKeys={selectedKeys}>
        {(layout.topMenu && layout.topMenu()) || null}
      </Menu>
    </Layout.Header>
  );
};
