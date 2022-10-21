import Block from "../utils/Block";
import { InputField } from "../components/InputField";

interface ValidateResultType {
  isValid: boolean;
  message: {
    errorMessage: string;
    tooltipMessage: string;
  };
  alertMessage?: string;
}

export function validateInputField(children: Record<string, Block>): {
  formData: {
    [key: string]: string;
  };
  result: ValidateResultType;
} {
  const formData: Record<string, string> = {};

  let result: ValidateResultType = {
    isValid: false,
    message: {
      errorMessage: "",
      tooltipMessage: "",
    },
    alertMessage: "",
  };

  Object.entries(children).forEach(([, value]) => {
    if (value.children) {
      Object.entries(value.children).forEach(([key1, value1]) => {
        if (key1 == "input") {
          const { fieldName, fieldValue } = (value1 as InputField).getData();

          formData[fieldName] = fieldValue;

          result = (value1 as InputField).validate();
          if (!result.isValid) {
            result.alertMessage = fieldName + ", " + result.alertMessage;
          }
        }
      });
    }
  });

  return { formData: formData, result: result };
}
