import Block from "../../utils/Block";
import template from "./signUp.hbs";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { Link } from "../../components/Link";
import { SignupData } from "../../api/AuthAPI";
import AuthController from "../../controllers/AuthController";
import { Button } from "../../components/Button";

export class SignUpPage extends Block {
  init() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateForm(this.children);

          if (result.isValid) {
            AuthController.signUp(formData as unknown as SignupData);
          } else {
            alert(result.alertMessage);
          }
        },
      },
    });

    this.children.inputEmail = new InputContainer({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: true,
      disabled: "",
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputPassword = new InputContainer({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.link = new Link({
      label: "Войти",
      to: "/",
      align: "center",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
