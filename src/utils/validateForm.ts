import Block from "@/src/utils/Block";
import { validateInputField } from "@/src/utils/validateInputField";

export function validateForm(children: Record<string, Block<any>>) {
  const { formData, result } = validateInputField(children);

  if (!result.isValid) {
    console.log("Некорректно заполнены поля формы");
    result.alertMessage =
      "Некорректно заполнены поля: " + result.alertMessage + ".";
  }

  return { formData, result };
}
