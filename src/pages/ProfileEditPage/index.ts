import Block from "../../block/block";
import template from "./profileEdit.hbs";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { validateInputField } from "../../utils/validateInputField";
import { navigation } from "../../data/navigation";

interface ProfileEditPageProps {
  styles: { [key: string]: string };
  avatar: { [key: string]: string };
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
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (result.isValid) {
            document.location.href = navigation.pages.profile.url;
          } else {
            console.log("Некорректно заполнены поля формы");
          }
        },
      },
    });

    this.children.inputEmail = new InputContainer({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: "required",
      disabled: "",
      regex: "^[A-z0-9._%+-]{0,}@[A-z]+.",
      value: "",
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

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: "required",
      disabled: "",
      regex: "^[A-ZА-Я]{1}[A-Za-zА-Яа-я-]{1,}$",
      value: "",
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: "required",
      disabled: "",
      regex: "^[A-ZА-Я]{1}[A-Za-zА-Яа-я-]{1,}$",
      value: "",
    });

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: "required",
      disabled: "",
      regex: "",
      value: "",
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: "required",
      disabled: "",
      regex: "^[+]{0,1}[0-9]{10,15}$",
      value: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
