import UserService from "../../../../lib/services/user";
import { profileTemplate } from "./page.template";

export default function ProfilePage(container) {
  if (!container) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    UserService.user = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };
  };

  container.innerHTML = profileTemplate(UserService.user);

  const profileForm = document.getElementById("profile-form");
  if (profileForm) profileForm.addEventListener("submit", handleSubmit);

  return () => {
    const profileForm = document.getElementById("profile-form");
    if (profileForm) profileForm.removeEventListener("submit", handleSubmit);
  };
}
