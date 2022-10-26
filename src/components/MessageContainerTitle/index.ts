import Block from "../../utils/Block";
import template from "./messageContainerTitle.hbs";

interface MessageContainerTitleProps {
  title: string;
  events: {
    click: (event: any) => void;
  };
}

export class MessageContainerTitle extends Block<MessageContainerTitleProps> {
  constructor(props: MessageContainerTitleProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
