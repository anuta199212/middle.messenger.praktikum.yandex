import Block from "../../utils/Block";
import template from "./messageContainer.hbs";
import { MessageContainerHeader } from "../MessageContainerHeader";
import ChatsController from "../../controllers/ChatsController";
import MessagesController, {
  Message as MessageInfo,
} from "../../controllers/MessagesController";
//import * as messageContainerStyles from "./messageContainer.module.scss";
import { CircleButton } from "../CircleButton";
import { validateForm } from "../../utils/validateForm";
import { InputMessageContainer } from "../InputMessageContainer";
import { withStore } from "../../utils/Store";
import { Message } from "../Message";

interface MessageContainerProps {
  styles: Record<string, string>;
  activeChat: any; //number | undefined;
  messages: MessageInfo[];
  userId: number;
}

export class MessageContainerBase extends Block<MessageContainerProps> {
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

    this.children.sendButton = new CircleButton({
      styles: this.props.styles,
      icon: "fa-solid fa-arrow-right",
      color: "primary",
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          if (!this.props.activeChat) {
            return;
          }

          const { formData, result } = validateForm(event, this.children);

          this.children.inputMessage.setValue("");

          if (result.isValid) {
            MessagesController.sendMessage(
              this.props.activeChat.chatId,
              formData.message,
            );
          }
        },
      },
    });

    this.children.inputMessage = new InputMessageContainer({
      styles: this.props.styles,
      name: "message",
      text: "Сообщение",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.messages = this.createMessages(this.props);
  }

  async openModal(event: any) {
    if (event.target.getAttribute("name") === "circleButton") {
      return;
    }

    await ChatsController.getchatsusers({ id: this.props.activeChat?.chatId });

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

    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessageContainerProps) {
    return props.messages.map((data) => {
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withActiveChatMessages = withStore((state) => {
  const activeChatId = state.activeChat?.chatId;

  if (!activeChatId) {
    return {
      messages: [],
      activeChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[activeChatId] || [],
    activeChat: state.activeChat,
    userId: state.user.id,
  };
});

export const MessageContainer = withActiveChatMessages(MessageContainerBase);
