import Block from "../../utils/Block";
import { CircleButton } from "../CircleButton";
import template from "./messageContainerHeader.hbs";
import img from "/static/account-circle.svg";

interface MessageContainerHeaderProps {
  styles: Record<string, string>;
  title: string;
  avatar: string;
}

export class MessageContainerHeader extends Block<MessageContainerHeaderProps> {
  constructor(props: MessageContainerHeaderProps) {
    super(props);
  }

  init() {
    this.children.button = new CircleButton({
      styles: this.props.styles,
      icon: "fa-solid fa-ellipsis-vertical",
      color: "grey",
    });
  }

  render() {
    return this.compile(template, { ...this.props, img });
  }
}
