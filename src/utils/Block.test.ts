import { expect } from "chai";
import Block from "./Block";

describe("Block", () => {
  interface TestComponentProps {
    name: string;
    text: string;
  }

  let isRendered = false;

  const template = (props: TestComponentProps) => {
    return `<div name='${props.name}'>${props.text}</div>`;
  };

  class ComponentClass extends Block<TestComponentProps> {
    public constructor(props: TestComponentProps) {
      super({ ...props });
    }

    protected init(): void {
      isRendered = false;
    }

    getProps() {
      return this.props;
    }

    protected render(): DocumentFragment {
      isRendered = true;
      return this.compile(template, this.props);
    }
  }

  const props = { name: "testName", text: "testText" };

  it("render executed", () => {
    new ComponentClass(props);

    expect(isRendered).to.eq(true);
  });

  it("getContent() return a string when rendered", () => {
    const Component = new ComponentClass(props);

    expect(Component.getContent()?.textContent).to.eq("testText");
  });

  it("setProps() updated props", () => {
    const Component = new ComponentClass(props);

    Component.setProps({ ...props, name: "testName2" });

    expect(Component.getProps().name).to.eq("testName2");
    expect(Component.getProps().text).to.eq("testText");
  });

  it("chidren added to Component", () => {
    const Component = new ComponentClass(props);

    Component.children.testDiv = new ComponentClass({
      name: "innerDiv",
      text: "innerComponent",
    });

    expect(Component.children?.testDiv.getProps().name).to.eq("innerDiv");
    expect(Component.children?.testDiv.getContent()?.textContent).to.eq(
      "innerComponent",
    );
  });
});
