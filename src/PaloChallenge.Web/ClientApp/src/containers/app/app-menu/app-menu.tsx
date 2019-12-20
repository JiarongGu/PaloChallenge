import { Icon, Layout } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { DeviceType } from '@models/common';
import { BreakpointSink, NavigationSink } from '@sinks/common';

import { AppMenuLink } from '../app-menu-link/app-menu-link';
import * as styles from './app-menu.module.scss';

export const AppMenu: React.FunctionComponent = () => {
  const navigation = useSink(NavigationSink);
  const breakPoint = useSink(BreakpointSink, (sink) => [sink.deviceType]);
  const [collapsed, setCollapsed] = React.useState(false);

  const activeRouteKeys = navigation.activeRoute && navigation.activeRoute.keys;

  return breakPoint.deviceType === DeviceType.Desktop ? (
    <Layout.Sider collapsible={true} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <div className={classNames(styles.logo)}>
        {collapsed && <Icon className={styles.logoIcon} type={'experiment'} />}
        {!collapsed && <h1 className={styles.logoText}>Palo Challenge</h1>}
      </div>
      <AppMenuLink routes={navigation.routes} selectedKeys={activeRouteKeys} showText={!collapsed} mode={'inline'} />
    </Layout.Sider>
  ) : (
    <AppMenuLink routes={navigation.routes} selectedKeys={activeRouteKeys} showText={true} mode={'horizontal'} />
  );
};
