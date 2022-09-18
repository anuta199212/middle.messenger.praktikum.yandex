import Block from "../../utils/Block";
import template from "./login.hbs";
import { Button1 } from "../../components/Button1";
import { Input } from "../../components/Input/input";
import styles from "../../styles.module.scss";
import { Link } from "../../components/Link";
import { SigninData, SignupData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import { InputContainer } from "../../components/InputContainer";

import * as inputStyles from "../../components/InputField/inputField.module.scss";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { Button } from "../../components/Button";
import { validateForm } from "../../utils/validateForm";
import { navigation } from "../../data/navigation";

export class LoginPage extends Block {
  constructor() {
    super({});
  }

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
          const { formData, result } = validateForm(
            event,
            this.children,
            navigation.pages[12].url,
          );

          if (result.isValid) {
            AuthController.signin(formData as unknown as SigninData);
          }
        },
      },
    });

    this.children.button1 = new Button1({
      label: "Войти 1",
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      label: "Регистрация",
      to: "/register",
    });
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof Input)
      .map((child) => [
        (child as Input).getName(),
        (child as Input).getValue(),
      ]);

    const data = Object.fromEntries(values);

    AuthController.signin(data as SignupData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
