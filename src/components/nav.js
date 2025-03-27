import appContext from "@lib/contexts/app";
import { NAV_CONFIGS } from "@lib/configs";
import AuthService from "@lib/services/auth";

document.addEventListener("click", (e) => {
  // 네비게이션 링크 클릭 처리
  if (e.target && e.target.matches('nav a:not([id="logout"])')) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    appContext.router.navigate(href);
  }

  // 로그아웃 링크 클릭 처리
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    appContext.authService.logout();
  }
});

export function Nav() {
  const isAuthenticated = AuthService.isAuthenticated;

  const navLink = (link) => {
    const { href, id, label } = link;

    const isActive =
      appContext.routerType === "hash"
        ? window.location.hash === `#${href}`
        : window.location.pathname === href;

    return `<li><a id="${id}" href="${href}" class="${isActive ? "font-bold text-blue-600" : "text-gray-600"}">${label}</a></li>`;
  };

  return `
    <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NAV_CONFIGS.common.map(navLink).join("")}
        ${isAuthenticated ? NAV_CONFIGS.authenticated.map(navLink).join("") : ""}
        ${!isAuthenticated ? NAV_CONFIGS.unauthenticated.map(navLink).join("") : ""}
      </ul>
    </nav>
  `;
}
