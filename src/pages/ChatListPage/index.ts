import Block from "../../block/block";
import template from "./chatList.hbs";
import * as chatListStyles from "./chatList.module.scss";

import { SendButton } from "../../components/SendButton";
import { validateInputField } from "../../utils/validateInputField";
import { InputMessageContainer } from "../../components/InputMessageContainer";
import { validateForm } from "../../utils/validateForm";

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
  avatar: Record<string, string>;
  name: string;
  lastMessage: LastMessageType;
  unReadCount: number;
}

interface MessageListType {
  item: ItemType[];
}

interface ChatListPageProps {
  styles: Record<string, string>;
  chatList: MessageListType;
  messageList: MessageType;
}

export class ChatListPage extends Block<ChatListPageProps> {
  constructor(props: ChatListPageProps) {
    super("div", props);
  }

  init() {
    this.children.sendButton = new SendButton({
      styles: chatListStyles,
      events: {
        click: (event: SubmitEvent) => {
          validateForm(event, this.children);
        },
      },
    });

    this.children.inputMessage = new InputMessageContainer({
      styles: chatListStyles,
      name: "message",
      text: "Сообщение",
      type: "text",
      required: true,
      disabled: "",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
