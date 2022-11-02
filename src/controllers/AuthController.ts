import API, { AuthAPI, SigninData, SignupData } from "@/src/api/AuthAPI";
import store from "@/src/utils/Store";
import router from "@/src/utils/Router";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signIn(data: SigninData) {
    try {
      await this.api.signIn(data);

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async signUp(data: SignupData) {
    try {
      await this.api.signUp(data);

      await this.fetchUser();

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set("user", user);
  }

  async logOut() {
    try {
      await this.api.logOut();

      router.go("/");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }
}

export default new AuthController();
