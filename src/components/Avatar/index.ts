import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./avatar.hbs";
import styles from "../../styles.module.scss";

interface AvatarProps extends PropsWithRouter {
  avatar: string;
  events?: {
    click: () => void;
  };
}

class BaseAvatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go("/avatar-edit");
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Avatar = withRouter(BaseAvatar);
