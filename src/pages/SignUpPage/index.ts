import Block from "../../block/block";
import template from "./signUp.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { navigation } from "../../data/navigation";
import { validateForm } from "../../utils/validateForm";

interface SignUpPageProps {
  styles: Record<string, string>;
}

export class SignUpPage extends Block<SignUpPageProps> {
  constructor(props: SignUpPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children, navigation.pages[12].url);
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
