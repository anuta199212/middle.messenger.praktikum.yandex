import Block from "../../block/block";
import template from "./passwordEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { InputContainer } from "../../components/InputContainer";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { navigation } from "../../data/navigation";
import { validateForm } from "../../utils/validateForm";

interface PasswordEditPageProps {
  styles: Record<string, string>;
  avatar: Record<string, string>;
}

export class PasswordEditPage extends Block<PasswordEditPageProps> {
  constructor(props: PasswordEditPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children, navigation.pages[2].url);
        },
      },
    });

    this.children.inputOldPsw = new InputContainer({
      styles: inputStyles,
      name: "oldPassword",
      text: "Текущий пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.inputNewPsw = new InputContainer({
      styles: inputStyles,
      name: "newPassword",
      text: "Новый пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.inputNewPswAppr = new InputContainer({
      styles: inputStyles,
      name: "newPasswordAppr",
      text: "Повторите новый пароль",
      type: "password",
      required: true,
      disabled: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
