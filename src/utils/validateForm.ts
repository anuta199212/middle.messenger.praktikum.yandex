import Block from "../utils/Block";
import { validateInputField } from "./validateInputField";

export function validateForm(
  event: SubmitEvent,
  children: Record<string, Block<any>>,
) {
  event.preventDefault();

  const { formData, result } = validateInputField(children);

  if (!result.isValid) {
    console.log("Некорректно заполнены поля формы");
  }

  return { formData, result };
}
