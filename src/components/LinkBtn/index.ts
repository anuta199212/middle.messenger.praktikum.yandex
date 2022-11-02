import Block from "@/src/utils/Block";
import { PropsWithRouter, withRouter } from "@/src/hocs/withRouter";
import template from "@/src/components/LinkBtn/link.hbs";
import styles from "@/src/styles.module.scss";

interface LinkBtnProps extends PropsWithRouter {
  to: string;
  label: string;
  events: {
    click: () => void;
  };
}

class BaseLinkBtn extends Block<LinkBtnProps> {
  constructor(props: LinkBtnProps) {
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

export const LinkBtn = withRouter(BaseLinkBtn);
