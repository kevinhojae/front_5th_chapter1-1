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

const rootElement = document.getElementById("root");

// TODO: refactor event handler register logic
rootElement.addEventListener("submit", (event) => {
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

  if (form.getAttribute("data-form-type") === "profile") {
    event.preventDefault();
    const formData = new FormData(form);

    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };

    localStorage.setItem("user", JSON.stringify(userData));
  }
});

rootElement.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout") {
    e.preventDefault();
    localStorage.removeItem("user");
    router.navigate("/login");
  }
});
