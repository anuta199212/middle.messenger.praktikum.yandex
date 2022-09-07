import Block from "../../block/block";
import template from "./chatCreate.hbs";
import { Button } from "../../components/Button";
import * as buttonStyles from "../../components/Button/button.module.scss";
import * as inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { navigation } from "../../data/navigation";
import { validateInputField } from "../../utils/validateInputField";

interface ChatCreatePageProps {
  styles: { [key: string]: string };
}

export class ChatCreatePage extends Block {
  constructor(props: ChatCreatePageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Добавить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (result.isValid) {
            document.location.href = navigation.pages[12].url;
          } else {
            console.log("Некорректно заполнены поля формы");
          }
        },
      },
    });

    this.children.input = new InputContainer({
      styles: inputStyles,
      name: "login",
      text: "Логин",
      type: "text",
      required: "required",
      disabled: "",
      regex: "^(?=.*[a-zA-Z-_])[a-zA-Z-_0-9]{3,20}$",
      value: "",
    });
  }

  componentDidMount() {
    const form: HTMLFormElement | null =
      this.element?.querySelector("form") ?? null;

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
