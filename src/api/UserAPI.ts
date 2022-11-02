import BaseAPI from "@/src/api/BaseAPI";

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface UserId {
  id: number;
}

export interface PasswordData {
  password: string;
}

export interface AvatarData {
  avatar: string;
}

export interface SearchUserData {
  login: string;
}
export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  profile(data: UserData) {
    return this.http.put("/profile", data);
  }

  get(data: UserId): Promise<User> {
    return this.http.get(`/user/${data.id}`);
  }

  password(data: PasswordData) {
    return this.http.put("/password", data);
  }

  avatar(data: AvatarData) {
    return this.http.put("/profile/avatar", data, "multipart/form-data");
  }

  searchUser(data: SearchUserData) {
    return this.http.post("/search", data);
  }

  read: undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new UserAPI();
