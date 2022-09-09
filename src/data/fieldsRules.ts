interface ErrorMessageType {
  length: string;
  match: string;
}

interface FieldType {
  regex: string;
  errorMessage: ErrorMessageType;
  minLength: number;
  maxLength?: number;
}

const fieldsRules: Record<string, FieldType> = {
  login: {
    regex: "^(?=.*[a-zA-Z-_])[a-zA-Z-_0-9]{3,20}$",
    errorMessage: {
      length: "Поле логин должно содержать от 3 до 20 символов.",
      match: "Допустимы латинские буквы, цифры, тире и нижнее подчеркивание.",
    },
    minLength: 3,
    maxLength: 20,
  },
  password: {
    regex: "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
    errorMessage: {
      length: "Пароль должен содержать от 8 до 40 символов.",
      match: "Пароль должен содержать хотя бы одну заглавную букву и цифру.",
    },
    minLength: 8,
    maxLength: 40,
  },
  first_name: {
    regex: "[A-ZА-Я]+[A-Za-zА-Яа-я-]{0,}$",
    errorMessage: {
      length: "",
      match:
        "Допустимы буквы латиницы, кириллицы и дефис. Первая буква - заглавная.",
    },
    minLength: 1,
  },
  second_name: {
    regex: "^[A-ZА-Я]+[A-Za-zА-Яа-я-]{0,}$",
    errorMessage: {
      length: "",
      match:
        "Допустимы буквы латиницы, кириллицы и дефис. Первая буква - заглавная.",
    },
    minLength: 1,
  },
  email: {
    regex: "^[A-z0-9._%+-]{1,}@[A-z]+.",
    errorMessage: {
      length: "",
      match:
        "Допустимы латинские буквы, цифры, символы '-', '+', '%', '_', '@'.",
    },
    minLength: 1,
  },
  phone: {
    regex: "^[+]{0,1}[0-9]{10,15}$",
    errorMessage: {
      length: "Номер телефона должен содержать от 10 до 15 символов.",
      match: "Допустимы цифры и символ '+'.",
    },
    minLength: 10,
    maxLength: 15,
  },
  display_name: {
    //TODO
    regex: "", //по заданию спринта 2 доп. правила добавлять нельзя, для этого поля их нет. но по заданию спринта 1 поле должно быть (п.2)
    errorMessage: {
      length: "",
      match: "",
    },
    minLength: 0,
  },
};

export { fieldsRules };
