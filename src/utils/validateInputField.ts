import Block from "@/src/utils/Block";
import { InputField } from "@/src/components/InputField";

interface ValidateResultType {
  isValid: boolean;
  alertMessage?: string;
}

export function validateInputField(children: Record<string, Block>): {
  formData: {
    [key: string]: string;
  };
  result: ValidateResultType;
} {
  const formData: Record<string, string> = {};

  const result: ValidateResultType = {
    isValid: true,
    alertMessage: "",
  };

  Object.entries(children).forEach(([, value]) => {
    if (value.children) {
      Object.entries(value.children).forEach(([key1, value1]) => {
        if (key1 == "input") {
          const { fieldName, fieldValue } = (value1 as InputField).getData();

          formData[fieldName] = fieldValue;

          const inputResult = (value1 as InputField).validate();

          if (!inputResult.isValid) {
            result.isValid = inputResult.isValid;

            if (result.alertMessage === "") {
              result.alertMessage = fieldName;
            } else {
              result.alertMessage += ", " + fieldName;
            }
          }
        }
      });
    }
  });

  return { formData: formData, result: result };
}
