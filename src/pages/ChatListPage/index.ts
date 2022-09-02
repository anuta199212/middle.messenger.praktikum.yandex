import Block from "../../block/block";
import template from "./chatList.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputField } from "../../components/InputField";
import * as chatListStyles from "./chatList.module.scss";

interface MessageItemType {
  class: string;
  text: string;
  image: string;
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
  avatar: string;
  name: string;
  lastMessage: LastMessageType;
  unReadCount: Number;
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

    this.children.input = new InputField({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
    });
  }

  render() {
    return this.compile(template, {
      styles: this.props.styles,
      chatList: this.props.chatList,
      messageList: this.props.messageList,
      chatListStyles,
    });
  }
}
