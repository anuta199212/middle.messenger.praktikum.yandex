import Block from "../../utils/Block";
import template from "./sendButton.hbs";

interface SendButtonProps {
  styles: Record<string, string>;
  events: {
    click: (event: any) => void;
  };
}

export class SendButton extends Block<SendButtonProps> {
  constructor(props: SendButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
