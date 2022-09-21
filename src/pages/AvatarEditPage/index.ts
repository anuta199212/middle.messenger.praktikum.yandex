import Block from "../../utils/Block";
import template from "./avatarEdit.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import styles from "../../styles.module.scss";
import UserController from "../../controllers/UserController";
import { AvatarData } from "../../api/UserAPI";

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
        click: (event: Event) => {
          console.log("clicked");
          const inputFile: HTMLInputElement | null =
            document.querySelector("#avatar");

          if (inputFile && inputFile.files) {
            event.preventDefault();

            const inputFile: any = document.getElementById("avatar");
            const formData: any = new FormData();

            formData.append("avatar", inputFile.files[0]);

            console.log("inputFile.files[0]:", inputFile.files[0]);
            console.log("formData:", formData);

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
