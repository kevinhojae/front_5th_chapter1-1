import { router } from "../../main";
import { loginTemplate } from "./page.template";

export default function LoginPage(container) {
  if (!container) return null;

  const handleSubmit = (event) => {
    const form = event.target;

    event.preventDefault();
    const formData = new FormData(form);

    const username = formData.get("username");
    // const password = formData.get("password");

    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    router.navigate("/");
  };

  container.innerHTML = loginTemplate();

  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", handleSubmit);

  return () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.removeEventListener("submit", handleSubmit);
  };
}
