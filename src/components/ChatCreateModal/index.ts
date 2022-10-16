import Block from "../../utils/Block";
import template from "./chatCreateModal.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import { CreateData } from "../../api/ChatsAPI";

class ChatCreateModalBase extends Block {
  init() {
    this.children.button = new Button({
      text: "Создать",
      styles: buttonStyles,
      events: {
        click: async (event: SubmitEvent) => {
          const { formData, result } = validateForm(event, this.children);

          if (result.isValid) {
            await ChatsController.createchats(
              formData as unknown as CreateData,
            );

            await ChatsController.getcurrentchats({
              limit: 1,
              title: formData.title,
            });

            await ChatsController.adduserschats({
              users: [this.props.user.id],
              chatId: this.props.createdChat[0].id,
            });
          } else {
            alert(result.alertMessage);
          }
        },
      },
    });

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "title",
      text: "Название чата",
      type: "text",
      required: true,
      disabled: "",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  user: state.user,
  createdChat: state.createdChat,
}));

export const ChatCreateModal = withChats(ChatCreateModalBase);
