import Block from "../../block/block";
import template from "./inputField.hbs";

interface InputFieldProps {
  styles: { [key: string]: string };
  name: string;
  type: string;
  text: string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
