import Block from "@/src/utils/Block";
import template from "@/src/pages/Error404Page/error404.hbs";
import styles from "@/src/styles.module.scss";
import { Link } from "@/src/components/Link";

export class Error404Page extends Block {
  init() {
    this.children.link = new Link({
      label: "Назад к чатам",
      to: "/messenger",
      align: "center",
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
