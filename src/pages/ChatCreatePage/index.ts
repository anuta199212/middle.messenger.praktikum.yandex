import Block from "../../block/block";
import template from "./chatCreate.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface ChatCreatePageProps {
  styles: { [key: string]: string };
}

export class ChatCreatePage extends Block {
  constructor(props: ChatCreatePageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.input = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
