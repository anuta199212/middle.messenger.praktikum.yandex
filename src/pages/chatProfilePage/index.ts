import Block from "../../block/block";
import template from "./chatProfile.hbs";
import inputStyles from "../../components/inputFieldDisabled/inputField.module.scss";
import { InputFieldDisabled } from "../../components/InputFieldDisabled";

interface ChatProfilePageProps {
  styles: { [key: string]: string };
}

export class ChatProfilePage extends Block {
  constructor(props: ChatProfilePageProps) {
    super("div", props);
  }

  init() {
    this.children.inputFName = new InputFieldDisabled({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
    });

    this.children.inputLogin = new InputFieldDisabled({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
    });

    this.children.inputPhone = new InputFieldDisabled({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
