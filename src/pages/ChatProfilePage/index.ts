import Block from "../../block/block";
import template from "./chatProfile.hbs";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

interface ChatProfilePageProps {
  styles: { [key: string]: string };
  avatar: { [key: string]: string };
}

export class ChatProfilePage extends Block {
  constructor(props: ChatProfilePageProps) {
    super("div", props);
  }

  init() {
    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: "",
      disabled: "disabled",
      regex: "^[A-ZА-Я]{1}[A-Za-zА-Яа-я-]{1,}$",
      value: "",
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "",
      disabled: "disabled",
      regex: "^(?=.*[a-zA-Z-_])[a-zA-Z-_0-9]{3,20}$",
      value: "",
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: "",
      disabled: "disabled",
      regex: "^[+]{0,1}[0-9]{10,15}$",
      value: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
