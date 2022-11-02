import Block from "@/src/utils/Block";
import template from "@/src/pages/PasswordEditPage/passwordEdit.hbs";
import { Button } from "@/src/components/Button";
import buttonStyles from "@/src/components/Button/button.module.scss";
import { InputContainer } from "@/src/components/InputContainer";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import { validateForm } from "@/src/utils/validateForm";
import UserController from "@/src/controllers/UserController";
import { PasswordData } from "@/src/api/UserAPI";
import { withStore } from "@/src/utils/Store";
import styles from "@/src/styles.module.scss";

class PasswordEditPageBase extends Block {
  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateForm(this.children);

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
