import Block from "../../utils/Block";
import template from "./passwordEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import { InputContainer } from "../../components/InputContainer";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { validateForm } from "../../utils/validateForm";
import UserController from "../../controllers/UserController";
import { PasswordData } from "../../api/UserAPI";
import { withStore } from "../../utils/Store";
import styles from "../../styles.module.scss";

class PasswordEditPageBase extends Block {
  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          const { formData, result } = validateForm(event, this.children);

          if (result.isValid) {
            UserController.password(formData as unknown as PasswordData);
          } else {
            alert(result.alertMessage);
          }
        },
      },
    });

    this.children.inputOldPsw = new InputContainer({
      styles: inputStyles,
      name: "oldPassword",
      text: "Текущий пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.inputNewPsw = new InputContainer({
      styles: inputStyles,
      name: "newPassword",
      text: "Новый пароль",
      type: "password",
      required: true,
      disabled: "",
    });

    this.children.inputNewPswAppr = new InputContainer({
      styles: inputStyles,
      name: "newPasswordAppr",
      text: "Повторите новый пароль",
      type: "password",
      required: true,
      disabled: "",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
const withUser = withStore((state) => ({ ...state.user }));

export const PasswordEditPage = withUser(PasswordEditPageBase);
