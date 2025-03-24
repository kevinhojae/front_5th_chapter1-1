import { authService } from "../../main";

// 문서 레벨에서 한 번만 이벤트 리스너 등록
document.addEventListener("click", (e) => {
  // 로그아웃 버튼을 클릭했는지 확인
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    authService.logout();
  }
});

export function Nav({ isAuthenticated }) {
  // TOOO: refactor localStorage service class
  const ProtectedLinks = () =>
    isAuthenticated
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
