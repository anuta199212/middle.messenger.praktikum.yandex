import Block from "../../block/block";
import template from "./error500.hbs";

interface ErrorPageProps {
  styles: { [key: string]: string };
}

export class Error500Page extends Block {
  constructor(props: ErrorPageProps) {
    super("div", props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
