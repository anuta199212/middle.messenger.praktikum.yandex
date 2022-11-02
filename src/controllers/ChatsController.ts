import API, {
  AddUsersData,
  ChatsAPI,
  CreateData,
  DeleteUsersData,
  GetCurentData,
  GetUserData,
} from "@/src/api/ChatsAPI";
import store from "@/src/utils/Store";
import router from "@/src/utils/Router";
import MessagesController from "@/src/controllers/MessagesController";

export class UserController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async createChats(data: CreateData) {
    try {
      await this.api.createChats(data);

      this.getchats();

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async deleteUsersChats(data: DeleteUsersData) {
    try {
      await this.api.deleteUsersChats(data);

      router.go("/messenger");
    } catch (e: any) {
      alert(e.reason);
      console.error(e);
    }
  }

  async addUsersChats(data: AddUsersData) {
    try {
      await this.api.addUsersChats(data);

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

  async getCurrentChats(data: GetCurentData) {
    try {
      const createdChat = await this.api.getCurrentChats(data);
      store.set("createdChat", createdChat);
    } catch (e: any) {
      alert(e.reason);
    }
  }

  async getchatsusers(data: GetUserData) {
    try {
      const users = await this.api.getUserChats(data);

      store.set("users", users);
    } catch (e: any) {
      alert(e.reason);
    }
  }
}

export default new UserController();
