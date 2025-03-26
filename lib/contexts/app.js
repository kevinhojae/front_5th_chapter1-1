import { createHashRouter, createBrowserRouter } from "@lib/router";
import AuthService from "@lib/services/auth";
import { APP_ROUTES } from "@lib/configs";

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

    switch (routerType) {
      case "hash":
        this.router = createHashRouter(APP_ROUTES);
        break;
      case "browser":
        this.router = createBrowserRouter(APP_ROUTES);
        break;
    }

    this.authService = new AuthService(this.router);
  }
}

const appContext = new AppContext();
export default appContext;
