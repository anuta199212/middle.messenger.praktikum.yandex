import Block from "../../block/block";
import template from "./login.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface LoginPageProps {
  styles: { [key: string]: string };
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Войти",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.inputLogin = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
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

interface LoginPageProps {
  navigation: PageListType;
  styles: { [key: string]: string };
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super("div", props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
*/
