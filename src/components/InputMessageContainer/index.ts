import Block from "../../utils/Block";
import template from "./inputMessageContainer.hbs";
import { InputField } from "../InputField";

interface InputMessageContainerProps {
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value?: string;
}

export class InputMessageContainer extends Block<InputMessageContainerProps> {
  setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  init() {
    this.children.input = new InputField({
      styles: this.props.styles,
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
