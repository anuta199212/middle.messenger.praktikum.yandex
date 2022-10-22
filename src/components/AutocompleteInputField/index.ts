import Block from "../../utils/Block";
import { fieldsRules } from "../../data/fieldsRules";
import template from "./autocompleteInputField.hbs";
import store from "../../utils/Store";
import * as autocompleteInputStyles from "../AutocompleteInputField/autocompleteInputField.module.scss";
import { debounce } from "../../utils/debounce";

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
    input: (event: any) => void;
    keydown: (event: any) => void;
  };
  autocompleteList: { id: number; login: string }[];
  autocompleteFunc: (value: any) => void;
}

export class AutocompleteInputField extends Block<AutocompleteInputFieldProps> {
  constructor(props: AutocompleteInputFieldProps) {
    super(props);
    this.props.id = "";
    this.props.events = {
      focus: () => this.onFocus(),
      blur: () => this.onBlur(),
      input: (event: any) => this.onInput(event),
      keydown: (event: any) => this.onKeyDown(event),
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

  private async onInput(event: any) {
    const changeInput = async (args: any) => {
      const value = (event.target as HTMLInputElement).value;

      this.closeAllLists();

      if (value) {
        await this.props.autocompleteFunc(value);
      }

      const autocompleteStoreList = store.getState().autocompleteList;

      const autocompleteList: { id: number; login: string }[] = [];

      if (Array.isArray(autocompleteStoreList)) {
        autocompleteStoreList.forEach((element: { id: number; login: any }) => {
          autocompleteList.push({ id: element.id, login: element.login });
        });
      }

      const arr = autocompleteList;

      if (!arr) {
        return;
      }

      if (!value) {
        return false;
      }
      this.currentFocus = -1;

      const list = document.createElement("DIV");
      list.setAttribute("id", this.id + "autocomplete-list");

      list.setAttribute("class", autocompleteInputStyles["autocomplete-items"]);

      event.target.parentNode?.appendChild(list);

      const self = this;

      document.addEventListener("click", function (e) {
        self.closeAllLists(e.target);
      });

      for (let i = 0; i < arr.length; i++) {
        const item = document.createElement("DIV");

        const itemInput = document.createElement("INPUT");
        itemInput.setAttribute("id", arr[i].id.toString());
        itemInput.setAttribute("type", "hidden");
        itemInput.setAttribute("value", arr[i].login);

        item.appendChild(document.createTextNode(arr[i].login));

        item.appendChild(itemInput);

        item.addEventListener("click", function (e) {
          event.target.value = this.getElementsByTagName("input")[0].value;

          self.props.id = this.getElementsByTagName("input")[0].id;
          self.props.value = this.getElementsByTagName("input")[0].value;

          self.closeAllLists();
        });
        list.appendChild(item);
      }

      event.target.focus();
    };

    const debouncedInput = debounce(changeInput, 1000);

    debouncedInput(this);
  }

  private onKeyDown(event: any) {
    const x = document.getElementsByClassName(
      autocompleteInputStyles["autocomplete-items"],
    )[0];

    let y: any;
    if (x) {
      y = x.getElementsByTagName("div");
    }
    if (event.code == "ArrowDown") {
      this.currentFocus++;

      this.addActive(y);
    } else if (event.code == "ArrowUp") {
      this.currentFocus--;

      this.addActive(y);
    } else if (event.code == "Enter") {
      event.preventDefault();
      if (this.currentFocus > -1) {
        if (x) y[this.currentFocus].click();
      }
    }
  }

  closeAllLists(elmnt?: any) {
    const x = document.getElementsByClassName(
      autocompleteInputStyles["autocomplete-items"],
    );
    const inp = document.getElementsByName("login")[0];
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode?.removeChild(x[i]);
      }
    }
  }

  addActive(y: any) {
    if (!y) return false;

    this.removeActive(y);
    if (this.currentFocus >= y.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = y.length - 1;

    y[this.currentFocus].classList.add(
      autocompleteInputStyles["autocomplete-active"],
    );
  }

  removeActive(y: any) {
    for (let i = 0; i < y.length; i++) {
      y[i].classList.remove(autocompleteInputStyles["autocomplete-active"]);
    }
  }

  protected componentDidUpdate(
    oldProps: AutocompleteInputFieldProps,
    newProps: AutocompleteInputFieldProps,
  ): boolean {
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
