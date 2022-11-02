import Block from "@/src/utils/Block";
import template from "@/src/components/MessageContainerTitle/messageContainerTitle.hbs";

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
