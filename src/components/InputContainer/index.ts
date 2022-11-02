import Block from "@/src/utils/Block";
import template from "@/src/components/InputContainer/inputContainer.hbs";
import { InputField } from "@/src/components/InputField";
import { AutocompleteInputField } from "@/src/components/AutocompleteInputField";

interface InputContainerProps {
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value?: string;
  autoComplete?: boolean;
  autocompleteFunc?: (value: string) => void;
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
      });
    } else {
      this.children.input = new InputField({
        ...this.props,
        value: this.props.value ?? "",
      });
    }
  }

  componentDidUpdate(
    _oldProps: InputContainerProps,
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
