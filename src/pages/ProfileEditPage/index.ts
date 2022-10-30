import Block from "../../utils/Block";
import template from "./profileEdit.hbs";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import UserController from "../../controllers/UserController";
import { UserData } from "../../api/UserAPI";

interface ProfileEditProps {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
class ProfileEditPageBase extends Block {
  constructor(props: ProfileEditProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Сохранить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateForm(this.children);

          if (result.isValid) {
            UserController.profile(formData as unknown as UserData);
          } else {
            alert(result.alertMessage);
          }
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
      value: this.props.email,
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
      value: this.props.login,
    });

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: true,
      disabled: "",
      value: this.props.first_name,
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: true,
      disabled: "",
      value: this.props.second_name,
    });

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: true,
      disabled: "",
      value: this.props.display_name,
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: true,
      disabled: "",
      value: this.props.phone,
    });
  }

  componentDidUpdate(_oldProps: ProfileEditProps, newProps: ProfileEditProps) {
    this.children.inputEmail.setProps({ value: newProps.email });
    this.children.inputLogin.setProps({ value: newProps.login });
    this.children.inputFName.setProps({ value: newProps.first_name });
    this.children.inputSName.setProps({ value: newProps.second_name });
    this.children.inputDName.setProps({ value: newProps.display_name });
    this.children.inputPhone.setProps({ value: newProps.phone });

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
const withUser = withStore((state) => ({ ...state.user }));

export const ProfileEditPage = withUser(ProfileEditPageBase);
