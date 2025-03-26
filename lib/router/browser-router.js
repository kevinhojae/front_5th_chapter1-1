import authGuard from "./auth-guard";

import { NotFound } from "@/pages/not-found";

export function createBrowserRouter(routes) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const _render = authGuard(routes, ({ redirectTo }) => {
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
    _render();
  };

  const run = () => {
    window.addEventListener("popstate", _render);
    _render();
  };

  return {
    navigate,
    run,
  };
}
