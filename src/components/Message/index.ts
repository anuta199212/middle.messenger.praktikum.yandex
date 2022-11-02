import Block from "@/src/utils/Block";
import template from "@/src/components/Message/message.hbs";
import styles from "@/src/components/Message/message.module.scss";

interface MessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
    // return this.compile(template, this.props);
  }
}
