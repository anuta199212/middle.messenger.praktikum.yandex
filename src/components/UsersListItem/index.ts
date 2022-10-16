import Block from "../../utils/Block";
import template from "./usersListItem.hbs";
import { DeleteUsersData } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";
import store from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import * as userListStyles from "./userList.module.scss";

interface UsersListItemProps {
  styles: Record<string, string>;
  user: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
    role: string;
  };
  events?: { click: (event: any) => void };
  isNotAdmin: boolean;
}

export class UsersListItem extends Block<UsersListItemProps> {
  constructor(props: UsersListItemProps) {
    super({
      ...props,
      events: {
        click: (event) => {
          event.preventDefault();

          if (event.target?.getAttribute("name") === "deleteUser") {
            const chatId = store.getState().activeChat?.chatId ?? 0;

            const reqData: DeleteUsersData = {
              users: [],
              chatId: chatId,
            };

            reqData.users.push(this.props.user.id);

            console.log(reqData);

            ChatsController.deleteuserschats(reqData);

            ChatsController.getchatsusers({ id: chatId });
          }
        },
      },
      isNotAdmin: props.user.role !== "admin",
    });
  }

  render() {
    return this.compile(template, { ...this.props, img, userListStyles });
  }
}
