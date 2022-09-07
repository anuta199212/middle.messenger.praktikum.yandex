import Block from "../../block/block";
import template from "./inputMessageContainer.hbs";
import { InputField } from "../InputField";

interface InputMessageContainerProps {
  styles: { [key: string]: string };
  name: string;
  type: string;
  text: string;
  required: string;
  disabled: string;
  regex: string;
  value: string;
}

export class InputMessageContainer extends Block {
  constructor(props: InputMessageContainerProps) {
    super("div", props);
  }

  init() {
    this.children.input = new InputField({
      styles: this.props.styles,
      name: this.props.name,
      type: this.props.type,
      text: this.props.text,
      required: this.props.required,
      disabled: this.props.disabled,
      regex: this.props.regex ?? "",
      value: this.props.value ?? "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
