import LandingPage from "./pages/(app)/landing/page";
import LoginPage from "./pages/login/page";
import ProfilePage from "./pages/(app)/profile/page";
import { createBrowserRouter } from "../lib/router";
import AuthService from "../lib/services/auth";

const routes = [
  { path: "/", element: LandingPage },
  { path: "/profile", element: ProfilePage },
  { path: "/login", element: LoginPage },
];

const router = createBrowserRouter(routes);
export const authService = new AuthService(router);
