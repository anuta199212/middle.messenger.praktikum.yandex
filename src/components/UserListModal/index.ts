import Block from "../../utils/Block";
import template from "./userListModal.hbs";
import styles from "../../styles.module.scss";
import { UsersList } from "../UsersList";
import { withStore } from "../../utils/Store";
import { ActiveChat } from "../../api/ChatsAPI";
import { User } from "../../api/AuthAPI";

interface UsersListModalProps {
  title?: string;
  usesrCount?: number;
  activeChat: ActiveChat;
  users: User[];
}

class UsersListModalBase extends Block {
  constructor(props: UsersListModalProps) {
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
