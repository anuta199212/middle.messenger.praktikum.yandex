import Block from "../../utils/Block";
import template from "./chatAddUser.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateForm } from "../../utils/validateForm";
import styles from "../../styles.module.scss";
import { withStore } from "../../utils/Store";

class ChatAddUserPageBase extends Block {
  init() {
    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children);
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
    });
  }

  /*componentDidMount() {
    const form = this.element?.querySelector("form");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }*/

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ ...state.chats }));

export const ChatAddUserPage = withChats(ChatAddUserPageBase);
