class AuthService {
  constructor(router) {
    if (AuthService.instance) return AuthService.instance;
    AuthService.instance = this;

    this.router = router;
  }

  static get isAuthenticated() {
    const userStr = localStorage.getItem("user");
    return !!userStr;
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
