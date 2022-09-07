import Block from "../../block/block";
import template from "./home.hbs";

interface PageListType {
  pages: {
    login: PageType;
    signUp: PageType;
    profile: PageType;
    avatarEdit: PageType;
    profileEdit: PageType;
    passwordEdit: PageType;
    error500: PageType;
    error404: PageType;
    chatProfile: PageType;
    chatCreate: PageType;
    chatDelete: PageType;
    chatClear: PageType;
    chatList: PageType;
  };
}

interface PageType {
  url: string;
  title: string;
}

interface HomePageProps {
  navigation: PageListType;
  styles: { [key: string]: string };
}

export class HomePage extends Block {
  constructor(props: HomePageProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
