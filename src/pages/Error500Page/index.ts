import { Link } from "@/src/components/Link";
import Block from "@/src/utils/Block";
import template from "@/src/pages/Error500Page/error500.hbs";
import styles from "@/src/styles.module.scss";

export class Error500Page extends Block {
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
