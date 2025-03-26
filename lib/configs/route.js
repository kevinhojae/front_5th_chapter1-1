import LandingPage from "@/pages/(app)/landing/page";
import ProfilePage from "@/pages/(app)/profile/page";
import LoginPage from "@/pages/login/page";

export const APP_ROUTES = [
  { path: "/", element: LandingPage },
  { path: "/profile", element: ProfilePage },
  { path: "/login", element: LoginPage },
];
