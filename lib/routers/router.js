import authGuard from "./auth-guard";
import { NotFound } from "@/pages/not-found";

export function createRouter({ routes, type }) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const _renderPage = authGuard({
    routes,
    routerType: type,
    renderCallback: ({ redirectTo }) => {
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
    },
  });

  const navigate = (newPath) => {
    if (type === "hash") {
      window.location.hash = newPath;
    } else {
      window.history.pushState({}, "", newPath);
    }
    _renderPage();
  };

  const run = () => {
    window.addEventListener(
      type === "hash" ? "hashchange" : "popstate",
      _renderPage,
    );
    _renderPage();
  };

  return {
    navigate,
    run,
  };
}
