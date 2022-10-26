import Block from "../../utils/Block";
import template from "./login.hbs";
import styles from "../../styles.module.scss";
import { Link } from "../../components/Link";
import { SigninData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import { InputContainer } from "../../components/InputContainer";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { Button } from "../../components/Button";
import { validateForm } from "../../utils/validateForm";

export class LoginPage extends Block {
  init() {
    this.children.login = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.password = new InputContainer({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.button = new Button({
      text: "Войти",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateForm(this.children);

          if (result.isValid) {
            AuthController.signIn(formData as unknown as SigninData);
          } else {
            alert(result.alertMessage);
          }
        },
      },
    });

    this.children.link = new Link({
      label: "Регистрация",
      to: "/sign-up",
      align: "center",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
