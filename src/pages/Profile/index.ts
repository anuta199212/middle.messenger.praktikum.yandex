import Block from "../../utils/Block";
import template from "./profile.hbs";
import { withStore } from "../../utils/Store";
import AuthController from "../../controllers/AuthController";
import { Button1 } from "../../components/Button1";

import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import styles from "../../styles.module.scss";
import { LinkTmp } from "../../components/Link_tmp";

class ProfilePageBase extends Block {
  init() {
    AuthController.fetchUser();

    this.children.inputEmail = new InputContainer({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: true,
      disabled: "disabled",
      value: this.props.email, //TODO
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.login,
    });

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.first_name,
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.second_name,
    });

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.display_name,
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.phone,
    });

    this.children.link = new LinkTmp({
      label: "Выйти",
      to: "/login",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });

    this.children.button1 = new Button1({
      label: "Выйти",
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
