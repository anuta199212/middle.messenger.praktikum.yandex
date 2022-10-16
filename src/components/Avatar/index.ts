import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./avatar.hbs";
import img from "/static/account-circle.svg";

interface AvatarProps extends PropsWithRouter {
  avatar: string;
  styles: Record<string, string>;
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
    return this.compile(template, { ...this.props, img });
  }
}

export const Avatar = withRouter(BaseAvatar);
