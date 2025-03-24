import LoginPage from "../pages/login/page";
import { NotFound } from "../pages/not-found";

export function BrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  const render = () => {
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
      rootElement.innerHTML = LoginPage();
      return;
    }

    rootElement.innerHTML = redirectRoute.element;
  };

  window.addEventListener("popstate", render);
  render();

  return {
    navigate: (newPath) => {
      window.history.pushState(null, "", newPath);
      render();
    },
  };
}
