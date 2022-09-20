import { User } from "./AuthAPI";
import BaseAPI from "./BaseAPI";

export interface CreateData {
  title: string;
}

export interface DeleteData {
  chatId: string;
}

export interface GetUserData {
  id: number;
}

export interface AddUsersData {
  users: number[];
  chatId: number;
}

export interface Chats {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: { user: User; time: string; content: string } | null;
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read(): Promise<Chats[]> {
    return this.http.get("");
  }

  /*async getchats() {
    return this.http.get("");
  }*/

  createchats(data: CreateData) {
    return this.http.post("", data);
  }

  deletechats(data: DeleteData) {
    return this.http.post("", data);
  }

  getuserchats(data: GetUserData) {
    return this.http.get(`/${data.id}/users`);
  }

  adduserschats(data: AddUsersData) {
    return this.http.post("/users", data);
  }

  // read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatsAPI();
