import { profileTemplate } from "./page.template";

export default function ProfilePage(container) {
  if (!container) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const userStr = localStorage.getItem("user");
  const user = userStr
    ? JSON.parse(userStr)
    : { username: "", email: "", bio: "" };

  console.log("user", user);

  container.innerHTML = profileTemplate(user);

  const profileForm = document.getElementById("profile-form");
  if (profileForm) profileForm.addEventListener("submit", handleSubmit);

  return () => {
    const profileForm = document.getElementById("profile-form");
    if (profileForm) profileForm.removeEventListener("submit", handleSubmit);
  };
}
