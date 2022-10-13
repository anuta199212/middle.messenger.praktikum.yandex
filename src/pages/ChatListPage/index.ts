import Block from "../../utils/Block";
import template from "./chatList.hbs";
import * as chatListStyles from "./chatList.module.scss";
import { CircleButton } from "../../components/CircleButton";
import { InputMessageContainer } from "../../components/InputMessageContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Router from "../../utils/Router";
import { Chats } from "../../api/ChatsAPI";
import { ChatList } from "../../components/ChatList";
import { MessageContainer } from "../../components/MessageContainer";
import { UsersList } from "../../components/UsersList";
import { UsersListModal } from "../../components/UserListModal";

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

    this.children.buttonCreate = new CircleButton({
      styles: chatListStyles,
      icon: "fa-solid fa-plus",
      color: "primary",
      events: {
        click: (event: Event) => {
          Router.go("/chats-create");
        },
      },
    });

    this.children.chatsList = new ChatList({});

    this.children.messageContainer = new MessageContainer({
      styles: styles,
      activeChat: this.props.activeChat,
    });

    // this.children.usersList = new UsersList({});

    // this.children.usersListModal = new UsersListModal({
    // title: this.props.activeChat?.title ?? "",
    // usersCount: this.props.users?.length ?? 0,
    // });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messageContainer.setProps({
      activeChat: newProps.activeChat,
    });

    this.children.usersListModal = new UsersListModal({});

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => {
  return {
    chats: state.chats,
    activeChat: state.activeChat,
    // users: state.users,
  };
});

export const ChatListPage = withChats(ChatListPageBase);
