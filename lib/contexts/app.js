import AuthService from "@lib/services/auth";
import { APP_ROUTES } from "@lib/configs";
import { createRouter } from "@lib/routers/router";

class AppContext {
  constructor() {
    if (AppContext.instance) return AppContext.instance;
    AppContext.instance = this;

    this.router = null;
    this.routerType = null;
    this.authService = null;
  }

  initialize(routerType = "browser") {
    this.routerType = routerType;
    this.router = createRouter({ routes: APP_ROUTES, type: routerType });
    this.authService = new AuthService(this.router);
  }
}

const appContext = new AppContext();
export default appContext;
