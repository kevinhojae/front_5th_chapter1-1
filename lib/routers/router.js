import authGuard from "./auth-guard";
import { NotFound } from "@/pages/not-found";

/**
 * 라우터 생성 함수
 * @description 라우터 타입에 따라 라우터를 생성
 * @param {Object} routes - 라우트 정보
 * @param {string} type - 라우터 타입
 * @returns {Object} 라우터 기능을 담은 객체
 */
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
