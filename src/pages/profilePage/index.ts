import Block from "../../block/block";
import template from "./profile.hbs";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface ProfilePageProps {
  styles: { [key: string]: string };
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super("div", props);
  }

  init() {
    this.children.inputEmail = new InputField({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: "required",
      disabled: "",
    });

    this.children.inputLogin = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputFName = new InputField({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputSName = new InputField({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputDName = new InputField({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputPhone = new InputField({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
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