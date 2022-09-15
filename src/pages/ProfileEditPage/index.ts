import Block from "../../block/block";
import template from "./profileEdit.hbs";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { navigation } from "../../data/navigation";
import { validateForm } from "../../utils/validateForm";

interface ProfileEditPageProps {
  styles: Record<string, string>;
  avatar: Record<string, string>;
}

export class ProfileEditPage extends Block<ProfileEditPageProps> {
  constructor(props: ProfileEditPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children, navigation.pages[2].url);
        },
      },
    });

    this.children.inputEmail = new InputContainer({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: true,
      disabled: "",
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: true,
      disabled: "",
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: true,
      disabled: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
