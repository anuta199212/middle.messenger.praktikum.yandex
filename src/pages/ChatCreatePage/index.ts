import Block from "../../block/block";
import template from "./chatCreate.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

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

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
    });
  }

  componentDidMount() {
    const form: HTMLFormElement | null =
      this.element?.querySelector("form") ?? null;

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
