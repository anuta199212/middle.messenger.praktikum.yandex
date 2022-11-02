import Block from "@/src/utils/Block";
import template from "@/src/pages/ProfilePage/profile.hbs";
import { withStore } from "@/src/utils/Store";
import AuthController from "@/src/controllers/AuthController";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import { InputContainer } from "@/src/components/InputContainer";
import styles from "@/src/styles.module.scss";
import { LinkBtn } from "@/src/components/LinkBtn";
import { Link } from "@/src/components/Link";
import { Avatar } from "@/src/components/Avatar";

interface ProfileProps {
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

class ProfilePageBase extends Block {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    AuthController.fetchUser();

    this.children.inputEmail = new InputContainer({
      styles: inputStyles,
      name: "email",
      text: "Почта",
      type: "email",
      required: true,
      disabled: "disabled",
      value: this.props.email,
    });

    this.children.inputLogin = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.login,
    });

    this.children.inputFName = new InputContainer({
      styles: inputStyles,
      name: "first_name",
      text: "Имя",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.first_name,
    });

    this.children.inputSName = new InputContainer({
      styles: inputStyles,
      name: "second_name",
      text: "Фамилия",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.second_name,
    });

    this.children.inputDName = new InputContainer({
      styles: inputStyles,
      name: "display_name",
      text: "Имя в чате",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.display_name,
    });

    this.children.inputPhone = new InputContainer({
      styles: inputStyles,
      name: "phone",
      text: "Телефон",
      type: "text",
      required: true,
      disabled: "disabled",
      value: this.props.phone,
    });

    this.children.linkDataChange = new Link({
      label: "Изменить данные",
      to: "/profile-edit",
    });

    this.children.linkPswChange = new Link({
      label: "Изменить пароль",
      to: "/password-edit",
    });

    this.children.linkChats = new Link({
      label: "К списку чатов",
      to: "/messenger",
    });

    this.children.linkLogout = new LinkBtn({
      label: "Выйти",
      to: "/login",
      events: {
        click: () => {
          AuthController.logOut();
        },
      },
    });

    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      styles,
    });
  }

  componentDidUpdate(_oldProps: ProfileProps, newProps: ProfileProps) {
    this.children.inputEmail.setProps({ value: newProps.email });
    this.children.inputLogin.setProps({ value: newProps.login });
    this.children.inputFName.setProps({ value: newProps.first_name });
    this.children.inputSName.setProps({ value: newProps.second_name });
    this.children.inputDName.setProps({ value: newProps.display_name });
    this.children.inputPhone.setProps({ value: newProps.phone });
    this.children.avatar.setProps({ avatar: newProps.avatar });

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
