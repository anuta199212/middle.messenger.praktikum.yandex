import Block from "../../block/block";
import template from "./chatDelete.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { navigation } from "../../data/navigation";
import { validateForm } from "../../utils/validateForm";

interface ChatDeletePageProps {
  styles: Record<string, string>;
}

export class ChatDeletePage extends Block<ChatDeletePageProps> {
  constructor(props: ChatDeletePageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Удалить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children, navigation.pages[12].url);
        },
      },
    });

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
    });
  }

  componentDidMount() {
    const form = this.element?.querySelector("form") ?? null;

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
