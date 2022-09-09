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
  styles: Record<string, string>;
}

export class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
