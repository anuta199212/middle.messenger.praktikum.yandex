import Block from "../../block/block";
import template from "./profile.hbs";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

interface ProfilePageProps {
  styles: Record<string, string>;
  avatar: Record<string, string>;
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super("div", props);
  }

  init() {
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

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
