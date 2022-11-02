import Block from "@/src/utils/Block";
import template from "@/src/components/Button/button.hbs";

interface ButtonProps {
  text: string;
  styles: Record<string, string>;
  events: {
    click: (event: any) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
