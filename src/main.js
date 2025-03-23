import LandingPage from "./pages/(app)/landing/page";
import LoginPage from "./pages/login/page";
import ProfilePage from "./pages/(app)/profile/page";
import { BrowserRouter } from "./components/browser-router";

const routes = [
  { path: "/", component: LandingPage() },
  { path: "/profile", component: ProfilePage() },
  { path: "/login", component: LoginPage() },
];

export const router = BrowserRouter(routes);
