import { Link } from "../../components/Link";
import Block from "../../utils/Block";
import template from "./error500.hbs";
import styles from "../../styles.module.scss";

export class Error500Page extends Block {
  init() {
    this.children.link = new Link({
      label: "Назад к чатам",
      to: "/chat-list",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
