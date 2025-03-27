function baseRouter(navigateImpl, runImpl) {
  return {
    navigate: navigateImpl,
    run: runImpl,
  };
}

function hashRouter(render) {
  return baseRouter(
    (newPath) => (window.location.hash = newPath),
    () => window.addEventListener("hashchange", render),
  );
}

function browserRouter(render) {
  return baseRouter(
    (newPath) => window.history.pushState({}, "", newPath),
    () => window.addEventListener("popstate", render),
  );
}

export { hashRouter, browserRouter };
