import API, {
  AvatarData,
  PasswordData,
  SearchUserData,
  UserAPI,
  UserData,
  UserId,
} from "../api/UserAPI";
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

      router.go("/settings");
    } catch (e: any) {
      console.error(e);
    }
  }

  async password(data: PasswordData) {
    try {
      await this.api.password(data);

      router.go("/settings");
    } catch (e: any) {
      console.error(e);
    }
  }

  async avatar(data: AvatarData) {
    try {
      await this.api.avatar(data);

      router.go("/settings");
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser(data: UserId) {
    const user = await this.api.get(data);

    store.set("user", user);
  }

  async searchuser(data: SearchUserData) {
    const autocompleteList = await this.api.searchuser(data);

    store.set("autocompleteList", autocompleteList);
  }
}

export default new UserController();
