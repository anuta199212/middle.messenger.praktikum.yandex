import Block from "../../utils/Block";
import template from "./chatsListItem.hbs";
import { Chats } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";
import store, { withStore } from "../../utils/Store";

interface ChatsListItemProps {
  activeChat: { chatId: number; title: string; avatar: string; userId: number };
  styles: Record<string, string>;
  chats: Chats;
  events?: { click: (event: Event) => void };
}

class ChatsListItemBase extends Block<ChatsListItemProps> {
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
    return this.compile(template, {
      ...this.props,
      img,
      isActive: this.props.chats.id === this.props.activeChat?.chatId,
    });
  }
}

const withChats = withStore((state) => {
  return {
    activeChat: state.activeChat,
  };
});

export const ChatsListItem = withChats(ChatsListItemBase);
