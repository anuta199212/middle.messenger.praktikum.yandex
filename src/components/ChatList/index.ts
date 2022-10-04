import Block from "../../utils/Block";
import template from "./chatList.hbs";
import { Chats } from "../../api/ChatsAPI";
import { ChatsListItem } from "../ChatsListItem";

interface ChatListPageProps {
  chats: Chats[];
  styles: Record<string, string>;
}

export class ChatList extends Block<ChatListPageProps> {
  constructor(props: ChatListPageProps) {
    super(props);
  }

  init() {
    const chatList = this.props.chats?.map((chatsItem: Chats) => {
      return new ChatsListItem({
        styles: this.props.styles,
        chats: chatsItem,
      });
    });

    this.children.chatsList = chatList ?? [];
  }

  render() {
    return this.compile(template, this.props); //TODO
  }
}
