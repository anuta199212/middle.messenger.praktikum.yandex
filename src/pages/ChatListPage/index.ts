import Block from "@/src/utils/Block";
import template from "@/src/pages/ChatListPage/chatList.hbs";
import chatListStyles from "@/src/pages/ChatListPage/chatList.module.scss";
import { CircleButton } from "@/src/components/CircleButton";
import styles from "@/src/styles.module.scss";
import { withStore } from "@/src/utils/Store";
import ChatsController from "@/src/controllers/ChatsController";
import Router from "@/src/utils/Router";
import { ActiveChat, Chats } from "@/src/api/ChatsAPI";
import { ChatList } from "@/src/components/ChatList";
import { MessageContainer } from "@/src/components/MessageContainer";
import { UsersListModal } from "@/src/components/UserListModal";
import { ChatCreateModal } from "@/src/components/ChatCreateModal";

interface ChatListPageProps {
  chats: Chats[];
  activeChat: ActiveChat;
}

export class ChatListPageBase extends Block {
  constructor(props: ChatListPageProps) {
    super(props);
  }

  init() {
    ChatsController.getchats();

    this.children.buttonMore = new CircleButton({
      name: "moreBtn",
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
              this.openModal();
            });
        },
      },
    });

    this.children.chatsList = new ChatList({});

    this.children.messageContainer = new MessageContainer({
      styles,
      activeChat: this.props.activeChat,
    });
  }

  componentDidUpdate(
    _oldProps: ChatListPageProps,
    newProps: ChatListPageProps,
  ): boolean {
    this.children.messageContainer.setProps({
      activeChat: newProps.activeChat,
    });

    this.children.usersListModal = new UsersListModal({});

    this.children.chatCreateModal = new ChatCreateModal({});

    this.children.buttonCreate = new CircleButton({
      name: "addChat",
      color: "primary",
      styles: chatListStyles,
      icon: "fa-solid fa-plus",
      events: {
        click: (event: Event) => {
          this.openModal();
          console.log(event);
        },
      },
    });

    return true;
  }

  async openModal() {
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
  };
});

export const ChatListPage = withChats(ChatListPageBase);
