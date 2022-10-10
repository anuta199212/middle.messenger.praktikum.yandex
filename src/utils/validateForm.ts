import Block from "../utils/Block";
import { validateInputField } from "./validateInputField";

export function validateForm(
  event: SubmitEvent,
  children: Record<string, Block<any>>,
) {
  event.preventDefault();

  const { formData, result } = validateInputField(children);

  //if (!url) {
  if (!result.isValid) {
    console.log("Некорректно заполнены поля формы");
  }
  /* } else if (result.isValid) {
    document.location.href = url;
  }*/

  return { formData, result };
}
