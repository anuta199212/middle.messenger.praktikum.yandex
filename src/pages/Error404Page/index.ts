import Block from "../../block/block";
import template from "./error404.hbs";

interface ErrorPageProps {
  styles: Record<string, string>;
}

export class Error404Page extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
