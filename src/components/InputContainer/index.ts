import Block from "../../utils/Block";
import template from "./inputContainer.hbs";
import * as inputStyles from "../InputField/inputField.module.scss";
import { InputField } from "../InputField";
import { AutocompleteInputField } from "../AutocompleteInputField";

interface InputContainerProps {
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value?: string;
  autoComplete?: boolean;
  autocompleteFunc?: (value: any) => void;
  autocompleteList?: [];
}

export class InputContainer extends Block<InputContainerProps> {
  constructor(props: InputContainerProps) {
    super(props);
  }

  init() {
    if (this.props.autoComplete) {
      this.children.input = new AutocompleteInputField({
        ...this.props,
        value: this.props.value ?? "",
        autocompleteList: this.props.autocompleteList ?? [],
        autocompleteFunc: this.props.autocompleteFunc ?? (() => {}),
        styles: inputStyles,
      });
    } else {
      this.children.input = new InputField({
        ...this.props,
        styles: inputStyles,
        value: this.props.value ?? "",
      });
    }
  }

  componentDidUpdate(
    oldProps: InputContainerProps,
    newProps: InputContainerProps,
  ) {
    this.children.input.setProps({ value: newProps.value });
    this.children.input.setProps({
      autocompleteList: newProps.autocompleteList,
    });

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
