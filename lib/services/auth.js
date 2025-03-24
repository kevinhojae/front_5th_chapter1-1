class AuthService {
  constructor(router) {
    if (AuthService.instance) return AuthService.instance;
    AuthService.instance = this;

    const userStr = localStorage.getItem("user");

    this.router = router;
    this.isAuthenticated = !!userStr;
    this.user = userStr
      ? JSON.parse(userStr)
      : { username: "", email: "", bio: "" };
  }

  login({ username }) {
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    this.router.navigate("/");
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate("/login");
  }
}
export default AuthService;
