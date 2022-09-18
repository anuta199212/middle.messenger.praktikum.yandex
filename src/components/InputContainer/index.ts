import Block from "../../utils/Block";
import template from "./inputContainer.hbs";
import * as inputStyles from "../InputField/inputField.module.scss";
import { InputField } from "../InputField";

interface InputContainerProps {
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value?: string;
}

export class InputContainer extends Block<InputContainerProps> {
  constructor(props: InputContainerProps) {
    super(props);
  }

  init() {
    this.children.input = new InputField({
      styles: inputStyles,
      name: this.props.name,
      type: this.props.type,
      text: this.props.text,
      required: this.props.required,
      disabled: this.props.disabled,
      value: this.props.value ?? "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
