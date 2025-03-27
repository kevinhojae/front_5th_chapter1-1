import AuthService from "@lib/services/auth";
import { APP_ROUTES } from "@lib/configs";
import { createRouter } from "@lib/routers";

/**
 * 실행 환경을 위한 컨텍스트
 * @description 현재 라우터 타입, 라우터, 유저 인증 서비스를 관리
 */
class RuntimeEnviroment {
  constructor() {
    if (RuntimeEnviroment.instance) return RuntimeEnviroment.instance;
    RuntimeEnviroment.instance = this;

    this.router = null;
    this.routerType = null;
    this.authService = null;
  }

  initialize(routerType = "browser") {
    this.routerType = routerType;
    this.router = createRouter({ routes: APP_ROUTES, type: routerType });
    this.authService = new AuthService(this.router);
  }
}

const env = new RuntimeEnviroment();
export default env;
