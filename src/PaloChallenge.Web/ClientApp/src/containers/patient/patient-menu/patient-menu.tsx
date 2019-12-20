import { Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { patientRoute } from '../patient-route';

export const PatientMenu = () => {
  return (
    (patientRoute.routes &&
      patientRoute.routes.map((route) => (
        <Menu.Item key={route.key}>
          {route.link && <Link to={route.link.url}>{route.link.name}</Link>}
        </Menu.Item>
      ))) ||
    null
  );
};
