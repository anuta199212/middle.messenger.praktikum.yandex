import Block from "../../block/block";
import template from "./avatarEdit.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";

interface AvatarEditPageProps {
  styles: { [key: string]: string };
}

export class AvatarEditPage extends Block {
  constructor(props: AvatarEditPageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Установить",
      styles: buttonStyles,
      events: {
        click: () => console.log("clicked"), //TODO
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
