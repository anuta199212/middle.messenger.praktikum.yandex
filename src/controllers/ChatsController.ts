import API, {
  AddUsersData,
  ChatsAPI,
  CreateData,
  DeleteData,
  GetUserData,
} from "../api/ChatsAPI";
import store from "../utils/Store";
import router from "../utils/Router";

export class UserController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async createchats(data: CreateData) {
    try {
      await this.api.createchats(data);

      await this.api.read();

      router.go("/chats-list");
    } catch (e: any) {
      console.error(e);
    }
  }

  async deletechats(data: DeleteData) {
    try {
      await this.api.deletechats(data);

      router.go("/chats-list");
    } catch (e: any) {
      console.error(e);
    }
  }

  async adduserschats(data: AddUsersData) {
    try {
      await this.api.adduserschats(data);

      router.go("/chats-list");
    } catch (e: any) {
      console.error(e);
    }
  }

  async getchats() {
    //TODO
    const chats = await this.api.read();

    store.set("chats", chats);
  }

  async getchatsusers(data: GetUserData) {
    //TODO
    const users = await this.api.getuserchats(data);

    store.set("users", users);
  }
}

export default new UserController();
