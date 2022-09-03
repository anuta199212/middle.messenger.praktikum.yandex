import Block from "../../block/block";
import template from "./inputContainer.hbs";
import inputStyles from "../InputField/inputField.module.scss";
import { InputField } from "../InputField";

interface InputContainerProps {
  styles: { [key: string]: string };
}

export class InputContainer extends Block {
  constructor(props: InputContainerProps) {
    super("div", props);
  }

  init() {
    this.children.inputEmail = new InputField({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: "required",
      disabled: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
