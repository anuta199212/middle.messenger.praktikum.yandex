import Block from "../../block/block";
import template from "./home.hbs";

interface PageListType {
  pages: PageType[];
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

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
