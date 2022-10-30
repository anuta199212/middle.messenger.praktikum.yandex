import Block from "../../utils/Block";
import template from "./avatarEdit.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import styles from "../../styles.module.scss";
import UserController from "../../controllers/UserController";
import { AvatarData } from "../../api/UserAPI";

interface AvatarEditPageProps {
  styles: Record<string, string>;
}

export class AvatarEditPage extends Block {
  constructor(props: AvatarEditPageProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      text: "Установить",
      styles: buttonStyles,
      events: {
        click: (event: Event) => {
          const inputFile: HTMLInputElement | null =
            document.querySelector("#avatar");

          if (inputFile && inputFile.files) {
            event.preventDefault();

            const inputFile: any = document.getElementById("avatar");
            const formData = new FormData();

            formData.append("avatar", inputFile.files[0]);

            UserController.avatar(formData as unknown as AvatarData);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
