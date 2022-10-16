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
    result.alertMessage =
      "Некорректно заполнены поля: " + result.alertMessage?.slice(0, -2) + ".";
  }

  return { formData, result };
}
