import LoginPage from "../src/pages/login/page";
import { NotFound } from "../src/pages/not-found";

export function createBrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const render = () => {
    if (typeof currentCleanup === "function") {
      currentCleanup();
      currentCleanup = null;
    }

    // TODO: refactor auth guard
    const user = localStorage.getItem("user");
    const isAuthenticated = !!user;

    const currentPath = window.location.pathname;

    const redirectRoute = routes.find((route) => route.path === currentPath);

    const rootElement = document.getElementById("root");

    if (!redirectRoute) {
      rootElement.innerHTML = NotFound();
      return;
    }

    if (currentPath !== "/" && !isAuthenticated) {
      window.history.pushState(null, "", "/login");
      currentCleanup = LoginPage(rootElement);
      return;
    }

    currentCleanup = redirectRoute.element(rootElement);
  };

  const navigate = (newPath) => {
    window.history.pushState(null, "", newPath);
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
