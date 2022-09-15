import Block from "../../block/block";
import template from "./avatarEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";

interface AvatarEditPageProps {
  styles: Record<string, string>;
}

export class AvatarEditPage extends Block<AvatarEditPageProps> {
  constructor(props: AvatarEditPageProps) {
    super("div", props);
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
    return this.compile(template, this.props);
  }
}
