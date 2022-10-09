import Block from "../../utils/Block";
import template from "./inputContainer.hbs";
import * as inputStyles from "../InputField/inputField.module.scss";
import { InputField } from "../InputField";
import { AutocompleteInputField } from "../AutocomleteInputField";

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
        styles: inputStyles,
        name: this.props.name,
        type: this.props.type,
        text: this.props.text,
        required: this.props.required,
        disabled: this.props.disabled,
        value: this.props.value ?? "",
        autocompleteFunc: this.props.autocompleteFunc ?? (() => {}),
        autocompleteList: this.props.autocompleteList ?? [],
      });
    } else {
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
