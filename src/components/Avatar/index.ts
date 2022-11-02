import Block from "@/src/utils/Block";
import { PropsWithRouter, withRouter } from "@/src/hocs/withRouter";
import template from "@/src/components/Avatar/avatar.hbs";
import img from "@/static/account-circle.svg";

interface AvatarProps extends PropsWithRouter {
  avatar: string;
  styles: Record<string, string>;
  events?: {
    click: () => void;
  };
  src?: string | Record<string, string>;
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

  protected init(): void {
    this.props.src = this.props.avatar
      ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
      : img;
  }

  navigate() {
    this.props.router.go("/avatar-edit");
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Avatar = withRouter(BaseAvatar);
