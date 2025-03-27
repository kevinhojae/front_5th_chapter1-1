import AuthService from "@lib/services/auth";
import { findRouteByPath } from "@lib/utils";

import { router as routerFactory } from "./router";

const LANDING_PATH = "/";
const LOGIN_PATH = "/login";

/**
 * 미들웨어 형태의 인증 가드
 * @description 유저 인증 상태, 접속 url에 따라 redirect 처리
 */
const authGuard = ({ routes, routerType, renderCallback }) => {
  return () => {
    const router = routerFactory(routerType)(renderCallback);

    const currentPath = router.currentPath;
    let redirectRoute = findRouteByPath(currentPath, routes);

    const isLoggedIn = AuthService.isAuthenticated;

    if (redirectRoute) {
      if (currentPath === LOGIN_PATH && isLoggedIn) {
        router.redirectTo(LANDING_PATH);
        redirectRoute = findRouteByPath(LANDING_PATH, routes);
      }

      if (
        currentPath !== LANDING_PATH &&
        currentPath !== LOGIN_PATH &&
        !isLoggedIn
      ) {
        router.redirectTo(LOGIN_PATH);
        redirectRoute = findRouteByPath(LOGIN_PATH, routes);
      }
    }

    renderCallback({ redirectTo: redirectRoute });
  };
};
export default authGuard;
