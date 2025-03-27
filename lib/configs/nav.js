export const NAV_CONFIGS = {
  common: [
    {
      id: "home",
      label: "홈",
      href: "/",
    },
  ],
  authenticated: [
    {
      id: "profile",
      label: "프로필",
      href: "/profile",
    },
    {
      id: "logout",
      label: "로그아웃",
      href: "#",
      action: "logout",
    },
  ],
  unauthenticated: [
    {
      id: "login",
      label: "로그인",
      href: "/login",
    },
  ],
};
