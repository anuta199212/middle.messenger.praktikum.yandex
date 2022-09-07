import Block from "../../block/block";
import template from "./inputField.hbs";

interface InputFieldProps {
  styles: { [key: string]: string };
  name: string;
  type: string;
  text: string;
  required: string;
  disabled: string;
  regex: string;
  value: string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super("div", props);
    this.props.value = "";
    this.props.events = {
      focus: () => this.onFocus(),
      blur: () => this.onBlur(),
      change: (event: any) => this.onChange(event),
    };
  }

  getData(): { fieldName: string; fieldValue: string } {
    return { fieldName: this.props.name, fieldValue: this.props.value };
  }

  validate(): { isValid: boolean; toolTipMessage: string } {
    let isValid = true;
    let toolTipMessage = "";

    if (this.props.required && !this.props.value) {
      isValid = false;
      toolTipMessage = "Обязательное поле";
    } else if (
      this.props.regex &&
      !this.props.value.toString().match(this.props.regex)
    ) {
      isValid = false;
      toolTipMessage = "Некорректное значение поля";
    }

    return { isValid, toolTipMessage };
  }

  onChange(event: any) {
    const value = (event.target as HTMLInputElement).value;

    this.setProps({ value: value });
  }

  onFocus() {
    const result = this.validate();

    console.log(result.toolTipMessage);
  }

  onBlur() {
    const result = this.validate();

    const message = document.getElementsByName(this.props.name + "ErrMessage")[0];

    message.innerText = result.toolTipMessage;
  }

  render() {
    return this.compile(template, this.props);
  }
}
