import Block from "../block/block";
import { InputField } from "../components/InputField";

export function validateInputField(children: Record<string, Block>): {
  formData: {
    [key: string]: string;
  };
  result: {
    isValid: boolean;
    toolTipMessage: string;
  };
} {
  const formData: { [key: string]: string } = {};
  let result: {
    isValid: boolean;
    toolTipMessage: string;
  } = { isValid: false, toolTipMessage: "" };

  Object.entries(children).forEach(([, value]) => {
    Object.entries(value.children).forEach(([key1, value1]) => {
      if (key1 == "input") {
        const { fieldName, fieldValue } = (value1 as InputField).getData();

        formData[fieldName] = fieldValue;

        result = (value1 as InputField).validate();
      }
    });
  });

  return { formData: formData, result: result };
}