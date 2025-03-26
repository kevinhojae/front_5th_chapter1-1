import { findRouteByPath } from "@lib/utils";
import { NotFound } from "@/pages/not-found";
import AuthService from "@lib/services/auth";

export function createHashRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;
  const hashAuthGuard = (routes, renderCallback) => {
    return () => {
      const currentPath = window.location.hash.slice(1) || "/";
      let redirectTo = findRouteByPath(currentPath, routes);

      const isLoggedIn = AuthService.isAuthenticated;

      if (redirectTo) {
        if (currentPath === "/login" && isLoggedIn) {
          window.location.hash = "#/";
          redirectTo = findRouteByPath("/", routes);
        }

        if (currentPath !== "/" && currentPath !== "/login" && !isLoggedIn) {
          window.location.hash = "#/login";
          redirectTo = findRouteByPath("/login", routes);
        }
      }

      renderCallback({ redirectTo });
    };
  };

  const _render = hashAuthGuard(routes, ({ redirectTo }) => {
    if (typeof currentCleanup === "function") {
      currentCleanup();
      currentCleanup = null;
    }

    const rootElement = document.getElementById("root");

    if (!redirectTo) {
      rootElement.innerHTML = NotFound();
      return;
    }

    currentCleanup = redirectTo.element(rootElement);
  });

  const navigate = (newPath) => {
    window.location.hash = newPath;
    _render();
  };

  const run = () => {
    window.addEventListener("hashchange", _render);
    _render();
  };

  return {
    navigate,
    run,
  };
}
