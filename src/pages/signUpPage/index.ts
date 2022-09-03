import Block from "../../block/block";
import template from "./signUp.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";

interface SignUpPageProps {
  styles: { [key: string]: string };
}

export class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Зарегистрироваться",
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

    this.children.inputPhone = new InputField({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputPassword = new InputField({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
      required: "required",
      disabled: "",
    });

    this.children.inputPassword = new InputField({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
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
