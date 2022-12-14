import Block from "../../utils/Block";
import template from "./usersList.hbs";
import { UsersListItem, UserWithRole } from "../UsersListItem";
import { withStore } from "../../utils/Store";
import styles from "../../styles.module.scss";

export class UsersListBase extends Block {
  constructor(props: any) {
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
