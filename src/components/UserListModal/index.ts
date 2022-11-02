import Block from "@/src/utils/Block";
import template from "@/src/components/UserListModal/userListModal.hbs";
import styles from "@/src/styles.module.scss";
import { UsersList } from "@/src/components/UsersList";
import { withStore } from "@/src/utils/Store";
import { ActiveChat } from "@/src/api/ChatsAPI";
import { User } from "@/src/api/AuthAPI";

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
