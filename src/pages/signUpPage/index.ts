import Block from "../../block/block";
import template from "./signUp.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface SignUpPageProps {
  styles: { [key: string]: string };
}

export class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.inputEmail = new InputField({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "text",
    });

    this.children.inputLogin = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
    });

    this.children.inputFName = new InputField({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
    });

    this.children.inputSName = new InputField({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
    });

    this.children.inputPhone = new InputField({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
    });

    this.children.inputPassword = new InputField({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
    });

    this.children.inputPassword = new InputField({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

/*
import Block from "../../block/block";
import template from "../loginPage/login.hbs";

interface PageListType {
  pages: PageType[];
}

interface PageType {
  url: string;
  title: string;
}

interface SignUpPageProps {
  navigation: PageListType;
  styles: { [key: string]: string };
}

export class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    super("div", props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
*/
