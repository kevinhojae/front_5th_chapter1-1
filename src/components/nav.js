import AuthService from "../../lib/services/auth";
import { authService } from "../main";

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    authService.logout();
  }
});

export function Nav() {
  const ProtectedLinks = () =>
    AuthService.isAuthenticated
      ? `
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>
      `
      : `<li><a id="login" href="/login" class="text-gray-600">로그인</a></li>`;

  return `
    <nav role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600">홈</a></li>
        ${ProtectedLinks()}
      </ul>
    </nav>
  `;
}
