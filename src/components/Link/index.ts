import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./link.hbs";
import styles from "../../styles.module.scss";

interface LinkProps extends PropsWithRouter {
  to: string;
  label: string;
  events?: {
    click: (event: any) => void;
  };
  align?: "left" | "center" | "right";
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.navigate(event),
      },
    });
  }
  init() {
    this.props.align = styles[`text-align-${this.props.align ?? "left"}`];
  }

  navigate(event: Event) {
    event.preventDefault();

    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(BaseLink);
