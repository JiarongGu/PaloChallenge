import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { effect, sink, SinkFactory, state, trigger } from 'redux-sink';

import { ActiveRoute, RouteModel } from '@models/common';

@sink('navigation')
export class NavigationSink {
  public static createHistory = (routes?: Array<RouteModel>) => {
    const history = createBrowserHistory();
    const navigation = SinkFactory.getSink(NavigationSink);

    if (routes) {
      navigation.addRoutes(routes);
    }

    history.listen(location => (navigation.location = location));
    navigation.history = history;
    navigation.location = history.location;

    return history;
  }

  @state public history!: History;
  @state public location!: Location;
  @state public activeRoute!: ActiveRoute;

  @state public routes: Array<RouteModel> = [];

  @effect
  public addRoute(route: RouteModel) {
    this.routes.push(route);
    this.routes = this.routes.concat();
  }

  @effect
  public addRoutes(routes: Array<RouteModel>) {
    this.routes = this.routes.concat(routes);
  }

  @trigger('navigation/location')
  public locationTrigger(location: Location) {
    const activeRoute = this.getActiveRoute(this.routes, location);

    if (activeRoute) {
      this.activeRoute = activeRoute;
    }
  }

  private getActiveRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | null {
    if (!location) {
      return null;
    }

    const activeRoute = this.getMatchedRoute(routes, location);

    if (activeRoute) {
      const searchParams = new URLSearchParams(location.search);
      const queryParams: { [key: string]: string | null } = {};

      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      return { ...activeRoute, queryParams };
    }
    return null;
  }

  private getMatchedRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | null {
    for (const route of routes) {
      const matches = matchPath(location.pathname, route.config);

      if (matches) {
        const keys = [route.key];
        let params = matches.params;
        let url = matches.url;
        let model = route;

        if (route.routes) {
          const subMatchedRoute = this.getMatchedRoute(route.routes, location);

          if (subMatchedRoute) {
            keys.push(...subMatchedRoute.keys);
            params = Object.assign(params, subMatchedRoute.params);
            url = subMatchedRoute.url;
            model = subMatchedRoute.model;
          }
        }
        return { keys, url, params, model, queryParams: {} };
      }
    }
    return null;
  }
}
