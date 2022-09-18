import Block from "../utils/Block";
import { validateInputField } from "./validateInputField";

export function validateForm(
  event: SubmitEvent,
  children: Record<string, Block<any>>,
  url?: string,
) {
  event.preventDefault();

  const { formData, result } = validateInputField(children);

  console.log(formData);

  if (!url) {
    if (!result.isValid) {
      console.log("Поле сообщения не должно быть пустым");
    }
  } /*else if (result.isValid) {
    document.location.href = url;
  }*/ else {
    console.log("Некорректно заполнены поля формы");
  }

  return { formData, result };
}
