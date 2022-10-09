import API, {
  AddUsersData,
  ChatsAPI,
  CreateData,
  DeleteData,
  DeleteUsersData,
  GetCurentData,
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

      router.go("/messenger");
    } catch (e: any) {
      console.error(e);
    }
  }

  async deleteuserschats(data: DeleteUsersData) {
    try {
      await this.api.deleteuserschats(data);

      router.go("/messenger");
    } catch (e: any) {
      console.error(e);
    }
  }

  async adduserschats(data: AddUsersData) {
    try {
      await this.api.adduserschats(data);

      router.go("/messenger");
    } catch (e: any) {
      console.error(e);
    }
  }

  async getchats() {
    //TODO
    const chats = await this.api.read();

    store.set("chats", chats);
  }

  async getcurrentchats(data: GetCurentData) {
    //TODO
    const createdChat = await this.api.getcurrentchats(data);

    store.set("createdChat", createdChat); //TODO
  }

  async getchatsusers(data: GetUserData) {
    //TODO
    const users = await this.api.getuserchats(data);

    store.set("users", users);
  }
}

export default new UserController();
