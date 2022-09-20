import Block from "../../utils/Block";
import template from "./error404.hbs";
import styles from "../../styles.module.scss";
import { Link } from "../../components/Link";

export class Error404Page extends Block {
  constructor() {
    super({});
  }

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
