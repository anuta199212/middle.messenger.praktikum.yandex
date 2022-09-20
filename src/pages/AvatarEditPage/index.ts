import Block from "../../utils/Block";
import template from "./avatarEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import styles from "../../styles.module.scss";

interface AvatarEditPageProps {
  styles: Record<string, string>;
}

export class AvatarEditPage extends Block {
  constructor(props: any) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Установить",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
