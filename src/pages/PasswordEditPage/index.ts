import Block from "../../block/block";
import template from "./passwordEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { InputContainer } from "../../components/InputContainer";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { validateInputField } from "../../utils/validateInputField";
import { navigation } from "../../data/navigation";

interface PasswordEditPageProps {
  styles: { [key: string]: string };
  avatar: { [key: string]: string };
}

export class PasswordEditPage extends Block {
  constructor(props: PasswordEditPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (result.isValid) {
            document.location.href = navigation.pages.profile.url;
          } else {
            console.log("Некорректно заполнены поля формы");
          }
        },
      },
    });

    this.children.inputOldPsw = new InputContainer({
      styles: inputStyles,
      name: "oldPassword",
      text: "Текущий пароль",
      type: "password",
      required: "required",
      disabled: "",
      regex: "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
      value: "",
    });

    this.children.inputNewPsw = new InputContainer({
      styles: inputStyles,
      name: "newPassword",
      text: "Новый пароль",
      type: "password",
      required: "required",
      disabled: "",
      regex: "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
      value: "",
    });

    this.children.inputNewPswAppr = new InputContainer({
      styles: inputStyles,
      name: "newPasswordAppr",
      text: "Повторите новый пароль",
      type: "password",
      required: "required",
      disabled: "",
      regex: "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
      value: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
