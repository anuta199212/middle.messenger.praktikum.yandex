import Block from "../../block/block";
import template from "./login.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateInputField } from "../../utils/validateInputField";
import { navigation } from "../../data/navigation";

interface LoginPageProps {
  styles: { [key: string]: string };
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Войти",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (result.isValid) {
            document.location.href = navigation.pages[12].url;
          } else {
            console.log("Некорректно заполнены поля формы");
          }
        },
      },
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
      regex: "^(?=.*[a-zA-Z-_])[a-zA-Z-_0-9]{3,20}$",
      value: "",
    });

    this.children.inputPassword = new InputContainer({
      styles: inputStyles,
      name: "password",
      text: "Пароль",
      type: "password",
      required: "required",
      disabled: "",
      regex: "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
      value: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
