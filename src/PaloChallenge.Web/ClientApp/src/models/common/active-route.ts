import { RouteModel } from './route-model';

export interface ActiveRoute {
  queryParams: { [key: string]: string | null };
  params: { [key: string]: any };
  keys: Array<string>;
  url: string;
  model: RouteModel;
}
