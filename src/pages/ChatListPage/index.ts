import Block from "../../block/block";
import template from "./chatList.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";

interface MessageItemType {
  class: string;
  text: string;
  image: { [key: string]: string };
  time: string;
}

interface MessageType {
  message: MessageItemType[];
}

interface LastMessageType {
  text: string;
  time: string;
}

interface ItemType {
  avatar: { [key: string]: string };
  name: string;
  lastMessage: LastMessageType;
  unReadCount: number;
}

interface ChatListType {
  item: ItemType[];
}

interface ChatListPageProps {
  styles: { [key: string]: string };
  chatList: ChatListType;
  messageList: MessageType;
}

export class ChatListPage extends Block {
  constructor(props: ChatListPageProps) {
    super("div", props);
  }

  init() {
    //console.log(chatListStyles);

    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
    });
  }

  componentDidMount() {
    const form: HTMLFormElement | null =
      this.element?.querySelector("form") ?? null;

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
