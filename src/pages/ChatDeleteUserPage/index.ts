import Block from "../../utils/Block";
import template from "./chatDeleteUser.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import UserController from "../../controllers/UserController";
import { SearchUserData } from "../../api/UserAPI";
import { AutocompleteInputField } from "../../components/AutocompleteInputField";
import { ActiveChat, DeleteUsersData } from "../../api/ChatsAPI";

interface ChatDeleteUserProps {
  activeChat: ActiveChat;
}

class ChatDeleteUserPageBase extends Block {
  constructor(props: ChatDeleteUserProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Удалить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();
          const { formData, result } = validateForm(this.children);

          console.log(formData);

          const reqData = this.prepairRequestData();

          if (result.isValid) {
            ChatsController.deleteUsersChats(reqData);
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

  prepairRequestData() {
    const reqData: DeleteUsersData = {
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

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withActiveChat = withStore((state) => ({
  activeChat: state.activeChat,
}));

export const ChatDeleteUserPage = withActiveChat(ChatDeleteUserPageBase);
