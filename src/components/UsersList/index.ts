import Block from "@/src/utils/Block";
import template from "@/src/components/UsersList/usersList.hbs";
import { UsersListItem, UserWithRole } from "@/src/components/UsersListItem";
import { withStore } from "@/src/utils/Store";
import styles from "@/src/styles.module.scss";

interface UsersListProps {
  users?: UserWithRole[];
}

export class UsersListBase extends Block<UsersListProps> {
  constructor(props: UsersListProps) {
    super(props);
  }

  init() {
    const usersList = this.props.users?.map((user: UserWithRole) => {
      return new UsersListItem({
        styles,
        user,
      });
    });

    this.children.usersList = usersList ?? [];
  }

  render() {
    return this.compile(template, { ...this.props, styles }); //TODO
  }
}

const withUsers = withStore((state) => {
  return { users: [...(state.users || [])] };
});

export const UsersList = withUsers(UsersListBase);
