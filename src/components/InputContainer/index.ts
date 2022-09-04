import Block from "../../block/block";
import template from "./inputContainer.hbs";
import inputStyles from "../InputField/inputField.module.scss";
import { InputField } from "../InputField";

interface InputContainerProps {
  styles: { [key: string]: string };
  name: string;
  type: string;
  text: string;
  required: string;
  disabled: string;
}

export class InputContainer extends Block {
  constructor(props: InputContainerProps) {
    super("div", props);
  }

  init() {
    this.children.input = new InputField({
      styles: inputStyles,
      name: this.props.name,
      type: this.props.type,
      text: this.props.text,
      required: this.props.required,
      disabled: this.props.disabled,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
