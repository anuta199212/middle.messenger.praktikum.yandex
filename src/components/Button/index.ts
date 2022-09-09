import Block from "../../block/block";
import template from "./button.hbs";

interface ButtonProps {
  text: string;
  styles: Record<string, string>;
  events: {
    click: (event: any) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
