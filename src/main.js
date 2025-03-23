import LandingPage from "./pages/(app)/landing/page";
import LoginPage from "./pages/login/page";
import ProfilePage from "./pages/(app)/profile/page";
import { NotFound } from "./pages/not-found";

const routes = {
  "/": LandingPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": NotFound,
};

routes;
