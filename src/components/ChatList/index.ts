import Block from "../../utils/Block";
import template from "./chatList.hbs";
import { Chats } from "../../api/ChatsAPI";
import { ChatsListItem } from "../ChatsListItem";
import { withStore } from "../../utils/Store";
import styles from "../../styles.module.scss";

interface ChaListProps {
  chats: Chats;
  isLoaded: boolean;
}

export class ChatListBase extends Block {
  constructor(props: ChaListProps) {
    super(props);
  }

  init() {
    this.createChatsList();
  }

  protected componentDidUpdate(
    oldProps: ChaListProps,
    newProps: ChaListProps,
  ): boolean {
    this.createChatsList();

    return true;
  }

  private createChatsList() {
    const chatList = this.props.chats?.map((chatsItem: Chats) => {
      return new ChatsListItem({
        styles,
        chats: chatsItem,
      });
    });

    this.children.chatsList = chatList ?? [];
  }

  render() {
    return this.compile(template, { ...this.props, styles }); //TODO
  }
}

const withChats = withStore((state) => {
  return {
    chats: [...(state.chats || [])],
    isLoaded: state.chatsAreLoaded,
  };
});

export const ChatList = withChats(ChatListBase);
