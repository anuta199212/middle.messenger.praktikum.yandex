import Block from "../../utils/Block";
import template from "./chatsListItem.hbs";
import { Chats } from "../../api/ChatsAPI";
import img from "/static/account-circle.svg";

interface ChatsListItemProps {
  styles: Record<string, string>;
  chats: Chats;
  event: { click: () => void };
}

export class ChatsListItem extends Block<ChatsListItemProps> {
  constructor(props: ChatsListItemProps) {
    super(props);
  }

  init() {}

  render() {
    return this.compile(template, { ...this.props, img });
  }
}
