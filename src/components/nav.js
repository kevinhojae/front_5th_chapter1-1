import appContext from "@lib/contexts/app";
import { NAV_CONFIGS } from "@lib/configs";
import AuthService from "@lib/services/auth";

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    appContext.authService.logout();
  }
});

export function Nav() {
  const isAuthenticated = AuthService.isAuthenticated;

  const navLink = (link) => {
    const isActive =
      appContext.routerType === "hash"
        ? window.location.hash === link.href
        : window.location.pathname === link.href;

    return `<li><a id="${link.id}" href="${link.href}" class="${link.className} ${isActive && "font-bold"}">${link.label}</a></li>`;
  };

  return `
    <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NAV_CONFIGS.common.map(navLink).join("")}
        ${isAuthenticated && NAV_CONFIGS.authenticated.map(navLink).join("")}
        ${!isAuthenticated && NAV_CONFIGS.unauthenticated.map(navLink).join("")}
      </ul>
    </nav>
  `;
}
