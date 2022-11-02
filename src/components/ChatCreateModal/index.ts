import Block from "@/src/utils/Block";
import template from "@/src/components/ChatCreateModal/chatCreateModal.hbs";
import { Button } from "@/src/components/Button";
import buttonStyles from "@/src/components/Button/button.module.scss";
import inputStyles from "@/src/components/InputField/inputField.module.scss";
import { InputContainer } from "@/src/components/InputContainer";
import { validateForm } from "@/src/utils/validateForm";
import styles from "@/src/styles.module.scss";
import { withStore } from "@/src/utils/Store";
import ChatsController from "@/src/controllers/ChatsController";
import { CreateData } from "@/src/api/ChatsAPI";

class ChatCreateModalBase extends Block {
  init() {
    this.children.button = new Button({
      text: "Создать",
      styles: buttonStyles,
      events: {
        click: async (event: SubmitEvent) => {
          event.preventDefault();
          const { formData, result } = validateForm(this.children);

          if (result.isValid) {
            await ChatsController.createChats(
              formData as unknown as CreateData,
            );

            await ChatsController.getCurrentChats({
              limit: 1,
              title: formData.title,
            });

            await ChatsController.addUsersChats({
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
