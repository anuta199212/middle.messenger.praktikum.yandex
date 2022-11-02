import Block from "@/src/utils/Block";
import { PropsWithRouter, withRouter } from "@/src/hocs/withRouter";
import template from "@/src/components/Link/link.hbs";
import styles from "@/src/styles.module.scss";

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
