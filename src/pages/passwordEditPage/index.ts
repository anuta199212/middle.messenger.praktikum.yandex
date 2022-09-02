import Block from "../../block/block";
import template from "./passwordEdit.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import { InputField } from "../../components/InputField";
import inputStyles from "../../components/InputField/inputField.module.scss";

interface PasswordEditPageProps {
  styles: { [key: string]: string };
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
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.inputOldPsw = new InputField({
      styles: inputStyles,
      name: "oldPassword",
      text: "Текущий пароль",
      type: "password",
    });

    this.children.inputNewPsw = new InputField({
      styles: inputStyles,
      name: "newPassword",
      text: "Новый пароль",
      type: "password",
    });

    this.children.inputNewPswAppr = new InputField({
      styles: inputStyles,
      name: "newPasswordAppr",
      text: "Повторите новый пароль",
      type: "password",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
