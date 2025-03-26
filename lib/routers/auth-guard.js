import AuthService from "@lib/services/auth";

import { findRouteByPath } from "@lib/utils";

const authGuard = ({ routes, routerType, renderCallback }) => {
  return () => {
    const currentPath =
      routerType === "hash"
        ? window.location.hash.slice(1)
        : window.location.pathname;

    let redirectRoute = findRouteByPath(currentPath, routes);

    const isLoggedIn = AuthService.isAuthenticated;

    if (redirectRoute) {
      if (currentPath === "/login" && isLoggedIn) {
        redirectLocationTo("/", routerType);
        redirectRoute = findRouteByPath("/", routes);
      }

      if (currentPath !== "/" && currentPath !== "/login" && !isLoggedIn) {
        redirectLocationTo("/login", routerType);
        redirectRoute = findRouteByPath("/login", routes);
      }
    }

    renderCallback({ redirectTo: redirectRoute });
  };
};

export default authGuard;

/**
 * 현재 라우터 타입에 따라 redirect 처리를 위한 헬퍼 함수
 *
 * @param {string} path - 리다이렉션할 경로
 * @param {boolean} routerType - 라우터 타입
 */
const redirectLocationTo = (path, routerType) => {
  switch (routerType) {
    case "hash":
      window.location.hash = `#${path}`;
      break;
    case "browser":
      window.history.pushState({}, "", path);
      break;
  }
};
