import { set } from "./helpers";
import { EventBus } from "./EventBus";
import Block from "./Block";
import { User } from "../api/AuthAPI";
import { ActiveChat, Chats } from "../api/ChatsAPI";
import { Message } from "../controllers/MessagesController";

export enum StoreEvents {
  Updated = "updated",
}

interface State {
  user: User;
  chats: Chats[];
  messages: Record<number, Message[]>;
  activeChat?: ActiveChat;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return function wrap(Component: typeof Block<any>) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
