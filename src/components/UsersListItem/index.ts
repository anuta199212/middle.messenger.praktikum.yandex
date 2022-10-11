import Block from "../../utils/Block";
import template from "./usersListItem.hbs";
import { Chats, DeleteUsersData } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";
import store, { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";

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
}

export class UsersListItem extends Block<UsersListItemProps> {
  constructor(props: UsersListItemProps) {
    super({
      ...props,
      events: {
        click: (event) => {
          event.preventDefault();

          console.log(event.target?.getAttribute("name"));

          if (event.target?.getAttribute("name") === "deleteUser") {
            const chatId = store.getState().activeChat?.chatId ?? 0;

            const reqData: DeleteUsersData = {
              users: [],
              chatId: chatId,
            };

            reqData.users.push(this.props.user.id);

            console.log(reqData);

            ChatsController.deleteuserschats(reqData);

            //ChatsController.getchatsusers({ id: chatId });
          }

          // console.log(this.props.users);
        },
      },
    });
  }

  init() {
    //this.children.deleteUser
  }

  render() {
    console.log("test");
    return this.compile(template, { ...this.props, img });
  }
}
