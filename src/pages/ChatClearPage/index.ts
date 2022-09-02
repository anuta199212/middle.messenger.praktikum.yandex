import Block from "../../block/block";
import template from "./chatClear.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface ChatClearPageProps {
  styles: { [key: string]: string };
}

export class ChatClearPage extends Block {
  constructor(props: ChatClearPageProps) {
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
