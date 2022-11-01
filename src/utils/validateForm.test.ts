import { expect } from "chai";
import { InputField } from "../components/InputField";
import Block from "./Block";
import { validateForm } from "./validateForm";

describe("validateForm", () => {
  interface TestComponentProps {
    inputs: { name: string; value: string }[];
  }

  interface InputComponentProps {
    name: string;
    value: string;
  }

  const correctProps: TestComponentProps = {
    inputs: [
      { name: "login", value: "Login" },
      { name: "password", value: "Psw12345!" },
      { name: "first_name", value: "FirstName" },
      { name: "second_name", value: "SecondName" },
      { name: "email", value: "email@email.tt" },
      { name: "phone", value: "8123456789" },
      { name: "display_name", value: "Display Name" },
      { name: "message", value: "Message" },
      { name: "title", value: "title" },
      { name: "new_password", value: "Psw12345!" },
      { name: "old_password", value: "Psw12345!" },
      { name: "new_password_appr", value: "Psw12345!" },
    ],
  };

  const incorrectProps: TestComponentProps = {
    inputs: [
      { name: "login", value: "" },
      { name: "password", value: "" },
      { name: "first_name", value: "" },
      { name: "second_name", value: "" },
      { name: "email", value: "" },
      { name: "phone", value: "" },
      { name: "display_name", value: "" },
      { name: "message", value: "" },
      { name: "title", value: "" },
      { name: "new_password", value: "" },
      { name: "old_password", value: "" },
      { name: "new_password_appr", value: "" },
    ],
  };

  const template = (props: TestComponentProps) => {
    let template = "";

    Object.entries(props.inputs).forEach(([_, input]) => {
      template += `<input name=${input.name} value=${input.value}/>`;
    });

    return `<div>${template}</div>`;
  };

  class ComponentClass extends Block<TestComponentProps> {
    public constructor(props: TestComponentProps) {
      super({ ...props });
    }

    protected init(): void {
      this.children.inputLogin = new InputContainerClass({
        name: this.props.inputs[0].name,
        value: this.props.inputs[0].value,
      });

      this.children.inputPassword = new InputContainerClass({
        name: this.props.inputs[1].name,
        value: this.props.inputs[1].value,
      });

      this.children.inputFirstName = new InputContainerClass({
        name: this.props.inputs[2].name,
        value: this.props.inputs[2].value,
      });

      this.children.inputSecondName = new InputContainerClass({
        name: this.props.inputs[3].name,
        value: this.props.inputs[3].value,
      });

      this.children.inputEmail = new InputContainerClass({
        name: this.props.inputs[4].name,
        value: this.props.inputs[4].value,
      });

      this.children.inputPhone = new InputContainerClass({
        name: this.props.inputs[5].name,
        value: this.props.inputs[5].value,
      });

      this.children.inputDisplayName = new InputContainerClass({
        name: this.props.inputs[6].name,
        value: this.props.inputs[6].value,
      });

      this.children.inputMessage = new InputContainerClass({
        name: this.props.inputs[7].name,
        value: this.props.inputs[7].value,
      });

      this.children.inputTitle = new InputContainerClass({
        name: this.props.inputs[8].name,
        value: this.props.inputs[8].value,
      });

      this.children.inputNewPassword = new InputContainerClass({
        name: this.props.inputs[9].name,
        value: this.props.inputs[9].value,
      });

      this.children.inputOldPassword = new InputContainerClass({
        name: this.props.inputs[10].name,
        value: this.props.inputs[10].value,
      });

      this.children.inputNewPasswordAppr = new InputContainerClass({
        name: this.props.inputs[11].name,
        value: this.props.inputs[11].value,
      });
    }

    protected render(): DocumentFragment {
      return this.compile(template, this.props);
    }
  }

  const inputContainerTemplate = () => {
    return `<div></div>`;
  };

  class InputContainerClass extends Block<InputComponentProps> {
    public constructor(props: InputComponentProps) {
      super({ ...props });
    }

    protected init(): void {
      this.children.input = new InputField({
        name: this.props.name,
        value: this.props.value,
        styles: {},
        type: "text",
        text: this.props.name,
        required: true,
        disabled: "",
      });
    }

    protected render(): DocumentFragment {
      return this.compile(inputContainerTemplate, this.props);
    }
  }

  it("should return isValid == true", () => {
    const component = new ComponentClass(correctProps);

    const { result } = validateForm(component.children);

    expect(result.isValid).to.eq(true);
    expect(result.alertMessage).to.eq("");
  });

  it("should return fields is invalid", () => {
    const component = new ComponentClass(incorrectProps);

    const { result } = validateForm(component.children);

    expect(result.isValid).to.eq(false);
    expect(result.alertMessage).to.eq(
      "Некорректно заполнены поля: login, password, first_name, second_name, email, phone, display_name, message, title, new_password, old_password, new_password_appr.",
    );
  });
});
