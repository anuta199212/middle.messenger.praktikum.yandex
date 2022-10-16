import Block from "../../utils/Block";
import template from "./chatList.hbs";
import * as chatListStyles from "./chatList.module.scss";
import { CircleButton } from "../../components/CircleButton";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import Router from "../../utils/Router";
import { Chats } from "../../api/ChatsAPI";
import { ChatList } from "../../components/ChatList";
import { MessageContainer } from "../../components/MessageContainer";
import { UsersListModal } from "../../components/UserListModal";
import { ChatCreateModal } from "../../components/ChatCreateModal";

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
  last_message: LastMessageType;
  unread_count: number;
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
    ChatsController.getchats();

    this.children.buttonMore = new CircleButton({
      styles: chatListStyles,
      icon: "fa-solid fa-ellipsis-vertical",
      color: "grey",
      events: {
        click: (event: Event) => {
          event.preventDefault();

          document
            .getElementsByName("mainDropdown")[0]
            ?.classList.toggle(styles.show);

          document
            .getElementsByName("toProfile")[0]
            ?.addEventListener("click", () => {
              Router.go("/settings");
            });

          document
            .getElementsByName("createChats")[0]
            ?.addEventListener("click", () => {
              this.openModal(event);
            });
        },
      },
    });

    this.children.chatsList = new ChatList({});

    this.children.messageContainer = new MessageContainer({
      styles: styles,
      activeChat: this.props.activeChat,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messageContainer.setProps({
      activeChat: newProps.activeChat,
    });

    this.children.usersListModal = new UsersListModal({});

    this.children.chatCreateModal = new ChatCreateModal({});

    return true;
  }

  async openModal(event: any) {
    const modal = document.getElementsByName("chatCreateModal")[0];

    if (modal) {
      modal.classList.toggle(styles.show);

      const span = document.getElementsByName("closeCreateModal")[0];

      span.onclick = function () {
        modal.classList.toggle(styles.show);
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.toggle(styles.show);
        }
      };
    }
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
