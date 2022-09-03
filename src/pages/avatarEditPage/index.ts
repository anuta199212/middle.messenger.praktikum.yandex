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

  componentDidMount() {
    const form: HTMLFormElement | null =
      this.element?.querySelector("form") ?? null;

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
