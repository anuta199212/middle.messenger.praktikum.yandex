import Block from "../../block/block";
import template from "./error500.hbs";

interface ErrorPageProps {
  styles: Record<string, string>;
}

export class Error500Page extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
