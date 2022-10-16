import Block from "../../utils/Block";
import template from "./circleButton.hbs";

interface CircleButtonProps {
  name: string;
  styles: Record<string, string>;
  icon: string;
  color: "primary" | "grey";
  events?: {
    click: (event: any) => void;
  };
  isGrey?: boolean;
}

export class CircleButton extends Block<CircleButtonProps> {
  constructor(props: CircleButtonProps) {
    super(props);
  }

  protected init(): void {
    this.props.isGrey = this.props.color === "grey" ? true : false;
  }

  render() {
    return this.compile(template, this.props);
  }
}
