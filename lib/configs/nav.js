export const NAV_CONFIGS = {
  common: [
    {
      id: "home",
      label: "홈",
      href: "/",
      className: "text-blue-600",
    },
  ],
  authenticated: [
    {
      id: "profile",
      label: "프로필",
      href: "/profile",
      className: "text-gray-600",
    },
    {
      id: "logout",
      label: "로그아웃",
      href: "#",
      className: "text-gray-600",
      action: "logout",
    },
  ],
  unauthenticated: [
    {
      id: "login",
      label: "로그인",
      href: "/login",
      className: "text-gray-600",
    },
  ],
};
