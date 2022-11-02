import Block from "@/src/utils/Block";
import template from "@/src/pages/LoginPage/login.hbs";
import styles from "@/src/styles.module.scss";
import { Link } from "@/src/components/Link";
import { SigninData } from "@/src/api/AuthAPI";
import AuthController from "@/src/controllers/AuthController";
import { InputContainer } from "@/src/components/InputContainer";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import buttonStyles from "@/src/components/Button/button.module.scss";
import { Button } from "@/src/components/Button";
import { validateForm } from "@/src/utils/validateForm";

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
