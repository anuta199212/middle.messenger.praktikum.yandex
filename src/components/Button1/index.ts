import Block from "../../utils/Block";
import template from "./button1.hbs";
import styles from "./styles.module.pcss";

interface Button1Props {
  type?: string;
  label: string;
  events: {
    click: () => void;
  };
}

export class Button1 extends Block<Button1Props> {
  constructor(props: Button1Props) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
