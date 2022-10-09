import Block from "../../utils/Block";
import template from "./chatAddUser.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import { AddUsersData } from "../../api/ChatsAPI";
import UserController from "../../controllers/UserController";
import { SearchUserData } from "../../api/UserAPI";

class ChatAddUserPageBase extends Block {
  constructor(props: any) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();
          const { formData, result } = validateForm(event, this.children);

          if (result.isValid) {
            //TODO
            UserController.searchuser(formData as unknown as SearchUserData);
          }
        },
      },
    });

    //TODO inputField - event
    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
      autoComplete: true,
      autocompleteFunc: (value: string) =>
        UserController.searchuser({ login: value } as SearchUserData),
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
}));

export const ChatAddUserPage = withChats(ChatAddUserPageBase);
