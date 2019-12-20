import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteModel } from '@models/common';
import { MenuMode } from 'antd/lib/menu';

export interface AppMenuLinkProps {
  selectedKeys: Array<string>;
  routes: Array<RouteModel>;
  showText: boolean;
  mode: MenuMode;
}

export const AppMenuLink: React.FunctionComponent<AppMenuLinkProps> = ({ selectedKeys, routes, showText, mode }) => {
  return (
    <Menu theme={'dark'} mode={mode} selectedKeys={selectedKeys}>
      {routes
        .filter((route) => route.link)
        .map((route) => {
          const link = route.link!;
          const name = link.name || route.key;
          return (
            <Menu.Item key={route.key} title={name}>
              <Link to={link.url}>
                {link.icon && <Icon type={link.icon} />}
                {showText && name}
              </Link>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
