import Block from "../../utils/Block";
import template from "./chatsListItem.hbs";
import { ActiveChat, Chats } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";
import store, { withStore } from "../../utils/Store";
import { convertTime } from "../../utils/convertTime";

interface ChatsListItemProps {
  activeChat: ActiveChat;
  styles: Record<string, string>;
  chats: Chats;
  events?: { click: (event: Event) => void };
  time?: string;
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
            userId: store.getState().user?.id,
          };
          store.set("activeChat", activeChat);
        },
      },
    });
  }

  init() {
    this.props.time = convertTime(this.props.chats.last_message?.time ?? "");
  }

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
