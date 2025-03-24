import LandingPage from "./pages/(app)/landing/page";
import LoginPage from "./pages/login/page";
import ProfilePage from "./pages/(app)/profile/page";
import { BrowserRouter } from "./components/browser-router";

const routes = [
  { path: "/", element: LandingPage },
  { path: "/profile", element: ProfilePage },
  { path: "/login", element: LoginPage },
];

export const router = BrowserRouter(routes);

// TODO: refactor event handler register logic

document.body.addEventListener("submit", (event) => {
  const form = event.target;

  if (form.getAttribute("data-form-type") === "login") {
    event.preventDefault();
    const formData = new FormData(form);

    const username = formData.get("username");
    // const password = formData.get("password");

    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    router.navigate("/");
  }
});

document.body.addEventListener("click", (event) => {
  const logoutLink = event.target.closest("#logout");

  if (logoutLink) {
    event.preventDefault();
    localStorage.removeItem("user");
    router.navigate("/login");
  }
});
