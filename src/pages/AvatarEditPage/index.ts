import Block from "@/src/utils/Block";
import template from "@/src/pages/AvatarEditPage/avatarEdit.hbs";
import { Button } from "@/src/components/Button";
import buttonStyles from "@/src/components/Button/button.module.scss";
import styles from "@/src/styles.module.scss";
import UserController from "@/src/controllers/UserController";
import { AvatarData } from "@/src/api/UserAPI";

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

            const inputFile: HTMLInputElement | null = document.getElementById(
              "avatar",
            ) as HTMLInputElement;
            const formData = new FormData();

            let file: string | Blob = "";
            if (inputFile && inputFile.files) {
              file = inputFile.files[0];
            }

            formData.append("avatar", file);

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
