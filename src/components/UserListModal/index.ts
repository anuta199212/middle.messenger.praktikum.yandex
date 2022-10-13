import Block from "../../utils/Block";
import template from "./userListModal.hbs";
import styles from "../../styles.module.scss";
import { UsersList } from "../UsersList";
import { withStore } from "../../utils/Store";

class UsersListModalBase extends Block {
  constructor(props: any) {
    super({
      ...props,
      title: props.activeChat?.title ?? "",
      usersCount: props.users?.length ?? 0,
    });
  }
  protected init(): void {
    this.children.usersList = new UsersList({});
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUsers = withStore((state) => {
  return {
    activeChat: state.activeChat,
    users: state.users,
  };
});

export const UsersListModal = withUsers(UsersListModalBase);
