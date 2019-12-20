import { RouteProps } from 'react-router';

import { RouteLinkModel } from './route-link-model';

export interface RouteModel {
  key: string;
  link?: RouteLinkModel;
  config: RouteProps;
  routes?: Array<RouteModel>;
}
