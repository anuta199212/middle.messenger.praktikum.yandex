import Block from "../../block/block";
import template from "./sendButton.hbs";

interface SendButtonProps {
  styles: { [key: string]: string };
  events: {
    click: (event: any) => void;
  };
}

export class SendButton extends Block {
  constructor(props: SendButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
