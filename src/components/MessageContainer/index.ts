import Block from "../../utils/Block";
import template from "./messageContainer.hbs";
import { MessageContainerHeader } from "../MessageContainerHeader";
import ChatsController from "../../controllers/ChatsController";

interface MessageContainerProps {
  styles: Record<string, string>;
  activeChat: { chatId: number; title: string; avatar: string; userId: string };
}

export class MessageContainer extends Block<MessageContainerProps> {
  constructor(props: MessageContainerProps) {
    super(props);
  }

  init() {
    this.children.header = new MessageContainerHeader({
      styles: this.props.styles,
      title: this.props.activeChat?.title ?? "",
      avatar: this.props.activeChat?.avatar ?? "",
      events: {
        click: (event) => this.openModal(event),
      },
    });
  }

  async openModal(event: any) {
    if (event.target.getAttribute("name") === "circleButton") {
      return;
    }

    await ChatsController.getchatsusers({ id: this.props.activeChat.chatId });

    const modal = document.getElementsByName("chatsUsersModal")[0];

    if (modal) {
      modal.classList.toggle(this.props.styles.show);

      const span = document.getElementsByName("closeChatsUsersModal")[0];

      const self = this;

      span.onclick = function () {
        modal.classList.toggle(self.props.styles.show);
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.toggle(self.props.styles.show);
        }
      };
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    this.children.header.setProps({
      title: newProps.activeChat?.title,
      avatar: newProps.activeChat?.avatar,
    });

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
