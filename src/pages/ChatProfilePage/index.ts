import Block from "../../block/block";
import template from "./chatProfile.hbs";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

interface ChatProfilePageProps {
  styles: Record<string, string>;
  avatar: Record<string, string>;
}

export class ChatProfilePage extends Block<ChatProfilePageProps> {
  constructor(props: ChatProfilePageProps) {
    super("div", props);
  }

  init() {
    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: false,
      disabled: "disabled",
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: false,
      disabled: "disabled",
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: false,
      disabled: "disabled",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
