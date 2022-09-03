import Block from "../../block/block";
import template from "./chatProfile.hbs";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface ChatProfilePageProps {
  styles: { [key: string]: string };
}

export class ChatProfilePage extends Block {
  constructor(props: ChatProfilePageProps) {
    super("div", props);
  }

  init() {
    this.children.inputFName = new InputField({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: "",
      disabled: "disabled",
    });

    this.children.inputLogin = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "",
      disabled: "disabled",
    });

    this.children.inputPhone = new InputField({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: "",
      disabled: "disabled",
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