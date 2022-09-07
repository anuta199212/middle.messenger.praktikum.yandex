import Block from "../../block/block";
import template from "./chatDelete.hbs";
import { Button } from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import inputStyles from "../../components/InputField/inputField.module.scss";
import { InputContainer } from "../../components/InputContainer";
import { validateInputField } from "../../utils/validateInputField";
import { navigation } from "../../data/navigation";

interface ChatDeletePageProps {
  styles: { [key: string]: string };
}

export class ChatDeletePage extends Block {
  constructor(props: ChatDeletePageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      text: "Удалить",
      styles: buttonStyles,
      events: {
        click: (event: SubmitEvent) => {
          event.preventDefault();

          const { formData, result } = validateInputField(this.children);

          console.log(formData);

          if (result.isValid) {
            document.location.href = navigation.pages.chatList.url;
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
