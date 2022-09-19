import API, { UserAPI, UserData, UserId } from "../api/UserAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async profile(data: UserData) {
    try {
      await this.api.profile(data);

      router.go("/profile");
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser(data: UserId) {
    const user = await this.api.get(data);

    store.set("user", user);
  }
}

export default new UserController();
