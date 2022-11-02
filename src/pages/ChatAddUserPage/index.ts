import Block from "@/src/utils/Block";
import template from "@/src/pages/ChatAddUserPage/chatAddUser.hbs";
import { Button } from "@/src/components/Button";
import buttonStyles from "@/src/components/Button/button.module.scss";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import { InputContainer } from "@/src/components/InputContainer";
import { validateForm } from "@/src/utils/validateForm";
import styles from "@/src/styles.module.scss";
import { withStore } from "@/src/utils/Store";
import ChatsController from "@/src/controllers/ChatsController";
import { ActiveChat, AddUsersData } from "@/src/api/ChatsAPI";
import UserController from "@/src/controllers/UserController";
import { SearchUserData } from "@/src/api/UserAPI";
import { AutocompleteInputField } from "@/src/components/AutocompleteInputField";

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
