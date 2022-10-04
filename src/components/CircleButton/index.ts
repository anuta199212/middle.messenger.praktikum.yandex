import Block from "../../utils/Block";
import template from "./circleButton.hbs";

interface CircleButtonProps {
  styles: Record<string, string>;
  icon: string;
  color: "primary" | "grey";
  events?: {
    click: (event: any) => void;
  };
}

export class CircleButton extends Block<CircleButtonProps> {
  constructor(props: CircleButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
