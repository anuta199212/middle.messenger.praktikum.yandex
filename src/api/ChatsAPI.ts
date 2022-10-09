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

export interface DeleteUsersData {
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
export interface GetCurentData {
  limit: number;
  title: string;
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

  deleteuserschats(data: DeleteUsersData) {
    return this.http.delete("/users", data);
  }

  getuserchats(data: GetUserData) {
    return this.http.get(`/${data.id}/users`);
  }

  adduserschats(data: AddUsersData) {
    return this.http.put("/users", data);
  }

  getcurrentchats(data: GetCurentData) {
    return this.http.get(`?limit=${data.limit}&title=${data.title}`);
  }

  // read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatsAPI();
