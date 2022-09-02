import Block from "../../block/block";
import template from "./button.hbs";

interface ButtonProps {
  text: string;
  styles: { [key: string]: string };
  events: {
    click: () => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
