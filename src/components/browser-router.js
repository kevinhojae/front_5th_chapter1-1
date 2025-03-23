import { NotFound } from "../pages/not-found";

export function BrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  const render = () => {
    const currentPath = window.location.pathname;

    const redirectRoute = routes.find((route) => route.path === currentPath);

    if (!redirectRoute) {
      document.body.innerHTML = NotFound();
      return;
    }

    document.body.innerHTML = redirectRoute.component;
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
