import LandingPage from "../src/pages/(app)/landing/page";
import LoginPage from "../src/pages/login/page";
import { NotFound } from "../src/pages/not-found";
import AuthService from "./services/auth";

export function createBrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const render = () => {
    if (typeof currentCleanup === "function") {
      currentCleanup();
      currentCleanup = null;
    }

    // TODO: refactor auth guard
    const currentPath = window.location.pathname;

    const redirectRoute = routes.find((route) => route.path === currentPath);

    const rootElement = document.getElementById("root");

    if (!redirectRoute) {
      rootElement.innerHTML = NotFound();
      return;
    }

    const isLoggedIn = AuthService.isAuthenticated;

    if (currentPath === "/login" && isLoggedIn) {
      window.history.pushState({}, "", "/");
      LandingPage(rootElement);
      return;
    }

    if (currentPath !== "/" && !AuthService.isAuthenticated) {
      window.history.pushState({}, "", "/login");
      currentCleanup = LoginPage(rootElement);
      return;
    }

    currentCleanup = redirectRoute.element(rootElement);
  };

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
