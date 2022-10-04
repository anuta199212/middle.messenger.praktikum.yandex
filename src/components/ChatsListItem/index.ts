import Block from "../../utils/Block";
import template from "./chatsListItem.hbs";
import { Chats } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";
import store from "../../utils/Store";

interface ChatsListItemProps {
  styles: Record<string, string>;
  chats: Chats;
  events?: { click: (event: Event) => void };
}

export class ChatsListItem extends Block<ChatsListItemProps> {
  constructor(props: ChatsListItemProps) {
    super({
      ...props,
      events: {
        click: () => {
          const activeChat = {
            chatId: this.props.chats.id,
            title: this.props.chats.title,
            avatar: this.props.chats.avatar,
            userId: store.getState().user?.id, //TODO
          };
          store.set("activeChat", activeChat);

          // console.log("activeChat:", store.getState().activeChat);
          //setTimeout(() => MessagesController.openWSS(), 100)} //TODO
        },
      },
    });
  }

  init() {}

  render() {
    return this.compile(template, { ...this.props, img });
  }
}
