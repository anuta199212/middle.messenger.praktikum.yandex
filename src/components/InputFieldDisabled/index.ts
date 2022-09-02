import Block from "../../block/block";
import template from "./inputFieldDisabled.hbs";

interface InputFieldDisabledProps {
  styles: { [key: string]: string };
  name: string;
  type: string;
  text: string;
}

export class InputFieldDisabled extends Block {
  constructor(props: InputFieldDisabledProps) {
    super("div", props);
  }

  render() {
    console.log(this.props.styles);
    return this.compile(template, this.props);
  }
}
