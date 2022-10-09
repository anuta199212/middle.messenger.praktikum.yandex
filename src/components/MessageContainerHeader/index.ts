import Block from "../../utils/Block";
import Router from "../../utils/Router";
import { CircleButton } from "../CircleButton";
import template from "./messageContainerHeader.hbs";
import img from "/static/account-circle.svg";

interface MessageContainerHeaderProps {
  styles: Record<string, string>;
  title: string;
  avatar: string;
}

export class MessageContainerHeader extends Block<MessageContainerHeaderProps> {
  constructor(props: MessageContainerHeaderProps) {
    super(props);
  }

  init() {
    this.children.button = new CircleButton({
      styles: this.props.styles,
      icon: "fa-solid fa-ellipsis-vertical",
      color: "grey",
      events: {
        click: (event: Event) => {
          event.preventDefault();

          document
            .getElementsByName("myDropdown")[0]
            ?.classList.toggle(this.props.styles.show);

          document
            .getElementsByName("addUser")[0]
            ?.addEventListener("click", () => {
              Router.go("/chats-add-user");
            });

          document
            .getElementsByName("deleteUser")[0]
            ?.addEventListener("click", () => {
              Router.go("/chats-delete-user");
            });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, img });
  }
}
