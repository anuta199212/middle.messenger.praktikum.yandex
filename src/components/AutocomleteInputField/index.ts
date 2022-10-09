import Block from "../../utils/Block";
import { fieldsRules } from "../../data/fieldsRules";
import template from "./autocompleteInputField.hbs";
import store from "../../utils/Store";

interface AutocompleteInputFieldProps {
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
    //change: (event: any) => void;
  };
  autocompleteList: { id: number; login: string }[];
  autocompleteFunc: (value: any) => void;
}

export class AutocompleteInputField extends Block<AutocompleteInputFieldProps> {
  constructor(props: AutocompleteInputFieldProps) {
    super(props);
    //this.props.value = "";
    this.props.events = {
      focus: () => this.onFocus(),
      blur: () => this.onBlur(),
      input: (event: any) => this.onInput(event),
      keydown: (event: any) => this.onKeyDown(event),
      /*change: (event: any) => {
        this.onChange(event);
      },*/
    };
  }

  currentFocus = -1;

  public getData(): { fieldName: string; fieldValue: string } {
    return { fieldName: this.props.name, fieldValue: this.props.value };
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

    message.innerText = result.message.errorMessage;
    tooltip.innerText = result.message.tooltipMessage;
  }

  private async onInput(event: any) {
    const value = (event.target as HTMLInputElement).value;

    // this.setProps({ ...this.props, value: value });

    if (value) {
      await this.props.autocompleteFunc(value);
    }

    const autocompleteStoreList = store.getState().autocompleteList;
    console.log("autocompleteList:", autocompleteStoreList);

    const autocompleteList: { id: number; login: string }[] = [];

    if (Array.isArray(autocompleteStoreList)) {
      autocompleteStoreList.forEach((element: { id: number; login: any }) => {
        autocompleteList.push({ id: element.id, login: element.login });
      });
    }

    console.log("onInput");
    let b: HTMLElement;
    let i: number;
    const val = value;

    // const arr = this.props.autocompleteList;
    const arr = autocompleteList;

    if (!arr) {
      return;
    }
    /*close any already open lists of autocompleted values*/
    this.closeAllLists();
    if (!val) {
      return false;
    }
    this.currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    const a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    event.target.parentNode?.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      /*create a DIV element for each matching element:*/
      b = document.createElement("DIV");
      /*make the matching letters bold:*/

      b.innerHTML = arr[i].login;
      /*insert a input field that will hold the current array item's value:*/
      b.innerHTML += "<input type='hidden' value='" + arr[i].login + "'>";
      /*execute a function when someone clicks on the item value (DIV element):*/

      const inp = event.target;
      const closeAllLists = this.closeAllLists;

      b.addEventListener("click", function (e) {
        /*insert the value for the autocomplete text field:*/
        inp.value = this.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
        closeAllLists();
      });
      a.appendChild(b);
    }
  }

  private onKeyDown(event: any) {
    console.log("onKeyDown");

    const x = document.getElementById(this.id + "autocomplete-list");
    let y: any;
    if (x) {
      y = x.getElementsByTagName("div");
    }
    if (event.code == "ArrowDown") {
      /*If the arrow DOWN key is pressed,
		  increase the currentFocus letiable:*/
      this.currentFocus++;
      /*and and make the current item more visible:*/
      this.addActive(y);
    } else if (event.code == "ArrowUp") {
      //up
      /*If the arrow UP key is pressed,
		  decrease the currentFocus letiable:*/
      this.currentFocus--;
      /*and and make the current item more visible:*/
      this.addActive(y);
    } else if (event.code == "Enter") {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      event.preventDefault();
      if (this.currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) y[this.currentFocus].click();
      }
    }
  }

  //TODO
  /*document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });*/

  closeAllLists(elmnt?: any) {
    console.log("closeAllLists");
    /*close all autocomplete lists in the document,
	except the one passed as an argument:*/
    const x = document.getElementsByClassName("autocomplete-items");
    const inp = document.getElementsByName("login")[0];
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode?.removeChild(x[i]);
      }
    }
  }

  addActive(y: any) {
    console.log("addActive");

    /*a function to classify an item as "active":*/
    if (!y) return false;
    /*start by removing the "active" class on all items:*/
    this.removeActive(y);
    if (this.currentFocus >= y.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = y.length - 1;
    /*add class "autocomplete-active":*/
    y[this.currentFocus].classList.add("autocomplete-active");
  }

  removeActive(y: any) {
    console.log("removeActive");

    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < y.length; i++) {
      y[i].classList.remove("autocomplete-active");
    }
  }

  protected componentDidUpdate(
    oldProps: AutocompleteInputFieldProps,
    newProps: AutocompleteInputFieldProps,
  ): boolean {
    return true;
  }

  render() {
    console.log("render");

    return this.compile(template, this.props);
  }
}
