import Block from "../../utils/Block";
import template from "./chatList.hbs";
import * as chatListStyles from "./chatList.module.scss";
import { CircleButton } from "../../components/CircleButton";
import { InputMessageContainer } from "../../components/InputMessageContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import store, { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Router from "../../utils/Router";
import { Chats } from "../../api/ChatsAPI";
import { ChatsListItem } from "../../components/ChatsListItem";
import { ChatList } from "../../components/ChatList";
import { MessageContainer } from "../../components/MessageContainer";

interface MessageItemType {
  incoming: boolean;
  text: string;
  time: string;
}

interface MessageType {
  message: MessageItemType[];
}

interface LastMessageType {
  text: string;
  time: string;
}

interface ItemType {
  avatar: Record<string, string>;
  name: string;
  lastMessage: LastMessageType;
  unReadCount: number;
}

interface MessageListType {
  item: ItemType[];
}

interface ChatListPageProps {
  chats: Chats[];
}

export class ChatListPageBase extends Block {
  constructor(props: any) {
    super(props);
  }

  init() {
    ChatsController.getchats(); //TODO

    this.children.sendButton = new CircleButton({
      styles: chatListStyles,
      icon: "fa-solid fa-arrow-right",
      color: "primary",
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children);
        },
      },
    });

    this.children.inputMessage = new InputMessageContainer({
      styles: chatListStyles,
      name: "message",
      text: "Сообщение",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.buttonCreate = new CircleButton({
      styles: chatListStyles,
      icon: "fa-solid fa-plus",
      color: "primary",
      events: {
        click: (event: Event) => {
          Router.go("/chats-create");
          console.log(event);
        },
      },
    });

    /*const chatList = this.props.chats?.map((chatsItem: Chats) => {
      return new ChatsListItem({
        styles: styles,
        chats: chatsItem,
        event: {
          click: (event: Event) => {
            this.openChats(event);
          },
        },
      });
    });

    this.children.chatsList = chatList ?? [];*/

    this.children.chatsList = new ChatList({
      chats: this.props.chats,
      styles: styles,
    });
    console.log(this.children.chatsList);

    this.children.messageContainer = new MessageContainer({
      styles: styles,
      activeChat: this.props.activeChat,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messageContainer.setProps({
      activeChat: newProps.activeChat,
    });
    return true;
  }

  openChats(event: Event) {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => {
  return { chats: state.chats, activeChat: state.activeChat };
});

export const ChatListPage = withChats(ChatListPageBase);
