import Block from "../../block/block";
import template from "./profileEdit.hbs";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";

interface ProfileEditPageProps {
  styles: { [key: string]: string };
}

export class ProfileEditPage extends Block {
  constructor(props: ProfileEditPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: () => {
          console.log("clicked");
        }, //TODO
      },
    });

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
