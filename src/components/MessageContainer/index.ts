import Block from "../../utils/Block";
import template from "./messageContainer.hbs";
import { MessageContainerHeader } from "../MessageContainerHeader";
import MessagesController, {
  Message as MessageInfo,
} from "../../controllers/MessagesController";
import { CircleButton } from "../CircleButton";
import { validateForm } from "../../utils/validateForm";
import { InputMessageContainer } from "../InputMessageContainer";
import { withStore } from "../../utils/Store";
import { Message } from "../Message";
import { ActiveChat } from "../../api/ChatsAPI";

interface MessageContainerProps {
  styles: Record<string, string>;
  activeChat: ActiveChat;
  messages: MessageInfo[];
  userId: number;
}

export class MessageContainerBase extends Block<MessageContainerProps> {
  constructor(props: MessageContainerProps) {
    super(props);
  }

  init() {
    this.children.header = new MessageContainerHeader({
      activeChatId: this.props.activeChat?.chatId,
      styles: this.props.styles,
      title: this.props.activeChat?.title ?? "",
      avatar: this.props.activeChat?.avatar ?? "",
    });

    this.children.sendButton = new CircleButton({
      name: "sendButton",
      styles: this.props.styles,
      icon: "fa-solid fa-arrow-right",
      color: "primary",
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

    document.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!this.props.activeChat) {
        return;
      }

      const { formData, result } = validateForm(this.children);

      console.log(formData);

      this.children.inputMessage.setValue("");

      if (result.isValid) {
        MessagesController.sendMessage(
          this.props.activeChat.chatId,
          formData.message,
        );
      } else {
        alert(result.alertMessage);
      }
    });
  }

  protected componentDidUpdate(
    oldProps: MessageContainerProps,
    newProps: MessageContainerProps,
  ) {
    this.children.header.setProps({
      activeChatId: newProps.activeChat?.chatId,
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
      userId: state.user?.id,
    };
  }

  return {
    messages: (state.messages || {})[activeChatId] || [],
    activeChat: state.activeChat,
    userId: state.user?.id,
  };
});

export const MessageContainer = withActiveChatMessages(MessageContainerBase);
