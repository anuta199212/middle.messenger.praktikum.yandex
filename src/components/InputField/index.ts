import Block from "@/src/utils/Block";
import { fieldsRules } from "@/src/data/fieldsRules";
import template from "@/src/components/InputField/inputField.hbs";

interface InputFieldProps {
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value: string;
  events?: {
    focus: () => void;
    blur: () => void;
    change: (event: Event) => void;
  };
}

export class InputField extends Block<InputFieldProps> {
  constructor(props: InputFieldProps) {
    super(props);
    this.props.events = {
      focus: () => this.onFocus(),
      blur: () => this.onBlur(),
      change: (event: Event) => this.onChange(event),
    };
  }

  public getData(): { fieldName: string; fieldValue: string } {
    return { fieldName: this.props.name, fieldValue: this.props.value };
  }

  public validate(): {
    isValid: boolean;
    message: { errorMessage: string; tooltipMessage: string };
  } {
    let isValid = true;
    const message: { errorMessage: string; tooltipMessage: string } = {
      errorMessage: "",
      tooltipMessage: "",
    };

    const maxLength = fieldsRules[this.props.name]?.maxLength;

    if (this.props.required && !this.props.value) {
      isValid = false;
      message.errorMessage = "Обязательное поле";
    } else if (
      (maxLength && this.props.value.length > maxLength) ||
      this.props.value.length < fieldsRules[this.props.name]?.minLength
    ) {
      isValid = false;
      message.errorMessage = "Некорректная длина поля";
      message.tooltipMessage = fieldsRules[this.props.name].errorMessage.length;
    } else if (
      !this.props.value.toString().match(fieldsRules[this.props.name]?.regex)
    ) {
      isValid = false;
      message.errorMessage = "Некорректное значение поля";
      message.tooltipMessage = fieldsRules[this.props.name]?.errorMessage.match;
    }

    return { isValid, message };
  }

  private onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.setProps({ ...this.props, value: value });
  }

  private onFocus() {
    const result = this.validate();

    console.log(result.message.tooltipMessage);
  }

  private onBlur() {
    const result = this.validate();

    const message = document.getElementsByName(
      this.props.name + "ErrMessage",
    )[0];

    const tooltip = document.getElementsByName(
      this.props.name + "ErrTooltip",
    )[0];

    if (message && tooltip) {
      message.innerText = result.message.errorMessage;
      tooltip.innerText = result.message.tooltipMessage;
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
