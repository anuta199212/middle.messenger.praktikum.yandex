import Block from "../../block/block";
import template from "./error404.hbs";

interface ErrorPageProps {
  styles: { [key: string]: string };
}

export class Error404Page extends Block {
  constructor(props: ErrorPageProps) {
    super("div", props);
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
