import { Layout, Menu } from 'antd';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { RouteContent } from '@components/route-content';
import { NavigationSink } from '@sinks/common';

import { AppMenu } from '../app-menu/app-menu';

import { AppHeaderMenu } from '../app-header-menu/app-header-menu';
import * as styles from './app-container.module.scss';

export const AppContainer: React.FunctionComponent = () => {
  const navigation = useSink(NavigationSink, false);
  const routeKeys = navigation.activeRoute && navigation.activeRoute.keys;

  return (
    <Layout className={styles.layout}>
      <AppMenu />
      <Layout>
        <AppHeaderMenu selectedKeys={routeKeys} />
        <Layout.Content className={styles.layoutContent}>
          <div className={styles.layoutRouteContent}>
            <RouteContent routes={navigation.routes} />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
