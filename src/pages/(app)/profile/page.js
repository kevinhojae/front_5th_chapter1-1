import { SubmitButton } from "../../../components/ui/submit-button";
import Layout from "../layout";

export default function ProfilePage() {
  const userStr = localStorage.getItem("user");
  const user = userStr
    ? JSON.parse(userStr)
    : { username: "", email: "", bio: "" };

  console.log("user", user);

  return Layout(
    () =>
      `
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form" data-form-type="profile">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            name="username"
            value="${user.username}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-bold mb-2"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            name="email"
            value="${user.email}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label
            for="bio"
            class="block text-gray-700 text-sm font-bold mb-2"
            >자기소개</label
          >
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >${user.bio}</textarea>
        </div>
        ${SubmitButton({ label: "프로필 업데이트" })}
      </form >
    </div >
  `,
  );
}
