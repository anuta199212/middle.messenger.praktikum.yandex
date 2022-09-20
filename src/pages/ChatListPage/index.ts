import Block from "../../utils/Block";
import template from "./chatList.hbs";
import * as chatListStyles from "./chatList.module.scss";
import { SendButton } from "../../components/CircleButton";
import { InputMessageContainer } from "../../components/InputMessageContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import store, { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Router from "../../utils/Router";
import { Chats } from "../../api/ChatsAPI";
import { ChatsListItem } from "../../components/ChatsListItem";

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

    this.children.sendButton = new SendButton({
      styles: chatListStyles,
      icon: "fa-solid fa-arrow-right",
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

    this.children.buttonCreate = new SendButton({
      styles: chatListStyles,
      icon: "fa-solid fa-plus",
      events: {
        click: (event: Event) => {
          Router.go("/chats-create");
          console.log(event);
        },
      },
    });

    const chatList = this.props.chats?.map((chatsItem: Chats) => {
      return new ChatsListItem({
        styles: styles,
        chats: chatsItem,
        event: { click: () => {} },
      });
    });

    this.children.chatsList = chatList;

    console.log("chats:", this.props.chats);
    console.log("chatList:", this.children.chatsList);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => {
  return { chats: state.chats };
});

export const ChatListPage = withChats(ChatListPageBase);
