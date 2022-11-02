import Block from "@/src/utils/Block";
import template from "@/src/pages/ChatDeleteUserPage/chatDeleteUser.hbs";
import { Button } from "@/src/components/Button";
import buttonStyles from "@/src/components/Button/button.module.scss";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import { InputContainer } from "@/src/components/InputContainer";
import { validateForm } from "@/src/utils/validateForm";
import styles from "@/src/styles.module.scss";
import { withStore } from "@/src/utils/Store";
import ChatsController from "@/src/controllers/ChatsController";
import UserController from "@/src/controllers/UserController";
import { SearchUserData } from "@/src/api/UserAPI";
import { AutocompleteInputField } from "@/src/components/AutocompleteInputField";
import { ActiveChat, DeleteUsersData } from "@/src/api/ChatsAPI";

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
