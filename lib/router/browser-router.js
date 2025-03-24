import { NotFound } from "../../src/pages/not-found";
import AuthService from "../services/auth";
import { findRouteByPath } from "../utils";
export function createBrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const authGuard = (renderCallback) => {
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

  const render = authGuard(({ redirectTo }) => {
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
    window.history.pushState({}, "", newPath);
    render();
  };

  const run = () => {
    window.addEventListener("popstate", render);
    render();
  };

  return {
    navigate,
    run,
  };
}
