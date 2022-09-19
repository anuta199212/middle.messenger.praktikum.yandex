import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./link.hbs";
import styles from "../../styles.module.scss";

interface LinkTmpProps extends PropsWithRouter {
  to: string;
  label: string;
  events: {
    click: () => void;
  };
}

class BaseLinkTmp extends Block<LinkTmpProps> {
  constructor(props: LinkTmpProps) {
    super({
      ...props,
      events: {
        click: props.events?.click,
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const LinkTmp = withRouter(BaseLinkTmp);
