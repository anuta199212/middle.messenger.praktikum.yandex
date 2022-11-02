import Block from "@/src/utils/Block";
import { fieldsRules } from "@/src/data/fieldsRules";
import template from "@/src/components/AutocompleteInputField/autocompleteInputField.hbs";
import store from "@/src/utils/Store";
import autocompleteInputStyles from "@/src/components/AutocompleteInputField/autocompleteInputField.module.scss";
import { debounce } from "@/src/utils/debounce";

interface AutocompleteInputFieldProps {
  id?: string;
  styles: Record<string, string>;
  name: string;
  type: string;
  text: string;
  required: boolean;
  disabled: string;
  value: string;
  events?: {
    focus: () => void;
    blur: () => void;
    input: () => void;
    keydown: (event: KeyboardEvent) => void;
  };
  autocompleteList: { id: number; login: string }[];
  autocompleteFunc: (value: string) => void;
}

export class AutocompleteInputField extends Block<AutocompleteInputFieldProps> {
  constructor(props: AutocompleteInputFieldProps) {
    super(props);
    this.props.id = "";
    this.props.events = {
      focus: () => this.onFocus(),
      blur: () => this.onBlur(),
      input: () => this.onInput(),
      keydown: (event: KeyboardEvent) => this.onKeyDown(event),
    };
  }

  currentFocus = -1;

  public getData(): { fieldName: string; fieldValue: string; fieldId: string } {
    return {
      fieldName: this.props.name,
      fieldValue: this.props.value,
      fieldId: this.props.id ?? "",
    };
  }

  public validate(): {
    isValid: boolean;
    message: { errorMessage: string; tooltipMessage: string };
  } {
    let isValid = true;
    const message: { errorMessage: string; tooltipMessage: string } = {
      errorMessage: "",
      tooltipMessage: "",
    };

    const maxLength = fieldsRules[this.props.name].maxLength;

    if (this.props.required && !this.props.value) {
      isValid = false;
      message.errorMessage = "Обязательное поле";
    } else if (
      (maxLength && this.props.value.length > maxLength) ||
      this.props.value.length < fieldsRules[this.props.name].minLength
    ) {
      isValid = false;
      message.errorMessage = "Некорректная длина поля";
      message.tooltipMessage = fieldsRules[this.props.name].errorMessage.length;
    } else if (
      !this.props.value.toString().match(fieldsRules[this.props.name].regex)
    ) {
      isValid = false;
      message.errorMessage = "Некорректное значение поля";
      message.tooltipMessage = fieldsRules[this.props.name].errorMessage.match;
    }

    return { isValid, message };
  }

  private onFocus() {
    const result = this.validate();

    console.log(result.message.tooltipMessage);
  }

  private onBlur() {
    const result = this.validate();

    const message = document.getElementsByName(
      this.props.name + "ErrMessage",
    )[0];

    const tooltip = document.getElementsByName(
      this.props.name + "ErrTooltip",
    )[0];

    if (message && tooltip) {
      message.innerText = result.message.errorMessage;
      tooltip.innerText = result.message.tooltipMessage;
    }
  }

  changeInput = async () => {
    //const value = (event.target as HTMLInputElement).value;

    const input = document.getElementsByName("login")[0] as HTMLInputElement;

    const value = input.value;

    this.closeAllLists();

    if (value) {
      await this.props.autocompleteFunc(value);
    }

    const autocompleteStoreList = store.getState().autocompleteList;

    let autocompleteList: { id: number; login: string }[] = [];

    if (Array.isArray(autocompleteStoreList)) {
      autocompleteList = autocompleteStoreList.map(
        (element: { id: number; login: string }) => {
          return {
            id: element.id,
            login: element.login,
          };
        },
      );

      //   autocompleteStoreList.forEach(
      //     (element: { id: number; login: string }) => {
      //       autocompleteList.push({ id: element.id, login: element.login });
      //     },
      //   );
    }

    if (!autocompleteList) {
      return;
    }

    if (!value) {
      return false;
    }
    this.currentFocus = -1;

    const list = document.createElement("DIV");
    list.setAttribute("id", this.id + "autocomplete-list");

    list.setAttribute("class", autocompleteInputStyles["autocomplete-items"]);

    input.parentNode?.appendChild(list);

    document.addEventListener("click", (e) => {
      this.closeAllLists(e.target);
    });

    autocompleteList.forEach((autocompleteItem) => {
      const item = document.createElement("DIV");

      const itemInput = document.createElement("INPUT");
      itemInput.setAttribute("id", autocompleteItem.id.toString());
      itemInput.setAttribute("type", "hidden");
      itemInput.setAttribute("value", autocompleteItem.login);

      item.appendChild(document.createTextNode(autocompleteItem.login));

      item.appendChild(itemInput);

      item.addEventListener("click", () => {
        const inputField = item.getElementsByTagName("input")[0];

        input.value = inputField.value;

        this.props.id = inputField.id;
        this.props.value = inputField.value;

        this.closeAllLists();
      });
      list.appendChild(item);
    });

    input.focus();
  };

  debouncedInput = debounce(this.changeInput, 1000);

  private async onInput() {
    this.debouncedInput();
  }

  private onKeyDown(event: KeyboardEvent) {
    const autocompleteListDiv = document.getElementsByClassName(
      autocompleteInputStyles["autocomplete-items"],
    )[0];

    console.log("x:", autocompleteListDiv);

    let autocompleteListArray: any;
    if (autocompleteListDiv) {
      autocompleteListArray = autocompleteListDiv.getElementsByTagName("div");
      console.log("y:", autocompleteListArray);
    }
    if (event.code == "ArrowDown") {
      this.currentFocus++;

      this.addActive(autocompleteListArray);
    } else if (event.code == "ArrowUp") {
      this.currentFocus--;

      this.addActive(autocompleteListArray);
    } else if (event.code == "Enter") {
      event.preventDefault();
      if (this.currentFocus > -1) {
        if (autocompleteListDiv) {
          autocompleteListArray[this.currentFocus].click();
        }
      }
    }
  }

  closeAllLists(element?: EventTarget | null) {
    const autocompleteListDiv = document.getElementsByClassName(
      autocompleteInputStyles["autocomplete-items"],
    );
    const inp = document.getElementsByName("login")[0];
    for (const item of autocompleteListDiv) {
      if (element != item && element != inp) {
        item.parentNode?.removeChild(item);
      }
    }
  }

  addActive(autocompleteListArray: Element[]) {
    if (!autocompleteListArray) {
      return false;
    }

    this.removeActive(autocompleteListArray);
    if (this.currentFocus >= autocompleteListArray.length)
      this.currentFocus = 0;
    if (this.currentFocus < 0)
      this.currentFocus = autocompleteListArray.length - 1;

    autocompleteListArray[this.currentFocus].classList.add(
      autocompleteInputStyles["autocomplete-active"],
    );
  }

  removeActive(autocompleteListArray: Element[]) {
    autocompleteListArray.forEach((item) => {
      item.classList.remove(autocompleteInputStyles["autocomplete-active"]);
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
