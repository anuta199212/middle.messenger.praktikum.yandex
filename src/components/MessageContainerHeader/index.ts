import ChatsController from "@/src/controllers/ChatsController";
import Block from "@/src/utils/Block";
import Router from "@/src/utils/Router";
import { CircleButton } from "@/src/components/CircleButton";
import { MessageContainerTitle } from "@/src/components/MessageContainerTitle";
import template from "@/src/components/MessageContainerHeader/messageContainerHeader.hbs";
import img from "@/static/account-circle.svg";

interface MessageContainerHeaderProps {
  styles: Record<string, string>;
  activeChatId: number;
  title: string;
  avatar: string;
}

export class MessageContainerHeader extends Block<MessageContainerHeaderProps> {
  constructor(props: MessageContainerHeaderProps) {
    super(props);
  }

  init() {
    this.children.button = new CircleButton({
      name: "chatMoreButton",
      styles: this.props.styles,
      icon: "fa-solid fa-ellipsis-vertical",
      color: "grey",
      events: {
        click: (event: Event) => {
          event.preventDefault();

          document
            .getElementsByName("myDropdown")[0]
            ?.classList.toggle(this.props.styles.show);

          document
            .getElementsByName("addUser")[0]
            ?.addEventListener("click", () => {
              Router.go("/chats-add-user");
            });
        },
      },
    });

    this.children.chatTitle = new MessageContainerTitle({
      title: this.props.title ?? "",
      events: {
        click: (event) => this.openUserListModal(event),
      },
    });
  }

  async openUserListModal(event: any) {
    if (event.target.getAttribute("name") === "chatMoreButton") {
      return;
    }

    await ChatsController.getchatsusers({ id: this.props.activeChatId });

    const modal = document.getElementsByName("chatsUsersModal")[0];

    if (modal) {
      modal.classList.toggle(this.props.styles.show);

      const span = document.getElementsByName("closeChatsUsersModal")[0];

      span.onclick = () => {
        modal.classList.toggle(this.props.styles.show);
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.classList.toggle(this.props.styles.show);
        }
      };
    }
  }

  protected componentDidUpdate(
    _oldProps: MessageContainerHeaderProps,
    newProps: MessageContainerHeaderProps,
  ): boolean {
    this.children.chatTitle.setProps({
      title: newProps.title,
    });

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, img });
  }
}
