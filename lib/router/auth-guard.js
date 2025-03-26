import AuthService from "@lib/services/auth";

import { findRouteByPath } from "@lib/utils";

const authGuard = (routes, renderCallback) => {
  return () => {
    const currentPath = window.location.pathname;
    let redirectTo = findRouteByPath(currentPath, routes);

    const isLoggedIn = AuthService.isAuthenticated;

    if (redirectTo) {
      if (currentPath === "/login" && isLoggedIn) {
        window.history.pushState({}, "", "/");
        redirectTo = findRouteByPath("/", routes);
      }

      if (currentPath !== "/" && currentPath !== "/login" && !isLoggedIn) {
        window.history.pushState({}, "", "/login");
        redirectTo = findRouteByPath("/login", routes);
      }
    }

    renderCallback({ redirectTo });
  };
};

export default authGuard;
