import Block from "../../block/block";
import template from "./login.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

export class LoginPage extends Block {
  constructor(props: any) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Войти",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
    });

    this.children.inputPassword = new InputContainer({
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

        //console.log("event",event.target.element)

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
