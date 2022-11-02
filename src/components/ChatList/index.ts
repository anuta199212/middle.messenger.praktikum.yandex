import Block from "@/src/utils/Block";
import template from "@/src/components/ChatList/chatList.hbs";
import { Chats } from "@/src/api/ChatsAPI";
import { ChatsListItem } from "@/src/components/ChatsListItem";
import { withStore } from "@/src/utils/Store";
import styles from "@/src/styles.module.scss";

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

  protected componentDidUpdate(): boolean {
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
