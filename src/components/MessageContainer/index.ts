import Block from "../../utils/Block";
import template from "./messageContainer.hbs";
import { MessageContainerHeader } from "../MessageContainerHeader";

interface MessageContainerProps {
  //chats: Chats[];
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
    });
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
