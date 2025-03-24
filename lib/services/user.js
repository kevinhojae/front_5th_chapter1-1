class UserService {
  static get user() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : { username: "", email: "", bio: "" };
  }

  static set user({ username, email, bio }) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        email,
        bio,
      }),
    );
  }
}
export default UserService;
