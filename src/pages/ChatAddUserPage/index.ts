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
import { ActiveChat, AddUsersData } from "../../api/ChatsAPI";
import UserController from "../../controllers/UserController";
import { SearchUserData } from "../../api/UserAPI";
import { AutocompleteInputField } from "../../components/AutocompleteInputField";

interface ChatAddUserProps {
  activeChat: ActiveChat;
}

class ChatAddUserPageBase extends Block {
  constructor(props: ChatAddUserProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();
          const { result } = validateForm(this.children);

          const reqData = this.prepairRequestData();

          console.log(reqData);

          if (result.isValid) {
            ChatsController.addUsersChats(reqData);
          } else {
            alert(result.alertMessage);
          }
        },
      },
    });

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: true,
      disabled: "",
      autoComplete: true,
      autocompleteFunc: (value: string) =>
        UserController.searchUser({ login: value } as SearchUserData),
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  prepairRequestData() {
    const reqData: AddUsersData = {
      users: [],
      chatId: this.props.activeChat?.chatId,
    };

    const input = this.children.input;

    Object.entries(input.children).forEach(([key1, value1]) => {
      if (key1 == "input") {
        const { fieldId } = (value1 as AutocompleteInputField).getData();

        reqData.users.push(parseInt(fieldId));
      }
    });

    return reqData;
  }
}

const withActiveChat = withStore((state) => ({
  activeChat: state.activeChat,
}));

export const ChatAddUserPage = withActiveChat(ChatAddUserPageBase);
