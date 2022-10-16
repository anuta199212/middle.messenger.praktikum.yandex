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
import MessagesController from "./MessagesController";

export class UserController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async createchats(data: CreateData) {
    try {
      await this.api.createchats(data);

      //await this.api.read();

      this.getchats();

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async deleteuserschats(data: DeleteUsersData) {
    try {
      await this.api.deleteuserschats(data);

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async adduserschats(data: AddUsersData) {
    try {
      await this.api.adduserschats(data);

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async getchats() {
    try {
      store.set("chatsAreLoaded", false);

      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });

      store.set("chats", chats);
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }

    store.set("chatsAreLoaded", true);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async getcurrentchats(data: GetCurentData) {
    try {
      const createdChat = await this.api.getcurrentchats(data);
      store.set("createdChat", createdChat);
    } catch (e: any) {
      alert(e.reason);
    }
  }

  async getchatsusers(data: GetUserData) {
    try {
      const users = await this.api.getuserchats(data);

      store.set("users", users);
    } catch (e: any) {
      alert(e.reason);
    }
  }
}

export default new UserController();
