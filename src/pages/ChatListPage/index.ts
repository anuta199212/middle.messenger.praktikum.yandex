import Block from "../../block/block";
import template from "./chatList.hbs";
import chatListStyles from "./chatList.module.scss";

import { SendButton } from "../../components/SendButton";
import { validateInputField } from "../../utils/validateInputField";
import { InputMessageContainer } from "../../components/InputMessageContainer";

interface MessageItemType {
  incoming: boolean;
  text: string;
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
    this.children.sendButton = new SendButton({
      styles: chatListStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (!result.isValid) {
            console.log("Поле сообщения не должно быть пустым");
          }
        },
      },
    });

    this.children.inputMessage = new InputMessageContainer({
      styles: chatListStyles,
      name: "message",
      text: "Сообщение",
      type: "text",
      required: "required",
      disabled: "",
      regex: "",
      value: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
