const navigation = {
  pages: {
    login: {
      url: "/src/pages/LoginPage/login.hbs",
      title: "Авторизация",
    },
    signUp: {
      url: "/src/pages/SignUpPage/signUp.hbs",
      title: "Регистрация",
    },
    profile: {
      url: "/src/pages/ProfilePage/profile.hbs",
      title: "Профиль",
    },
    avatarEdit: {
      url: "/src/pages/AvatarEditPage/avatarEdit.hbs",
      title: "Изменить аватар",
    },
    profileEdit: {
      url: "/src/pages/ProfileEditPage/profileEdit.hbs",
      title: "Изменить данные",
    },
    passwordEdit: {
      url: "/src/pages/PasswordEditPage/passwordEdit.hbs",
      title: "Изменить пароль",
    },
    error500: {
      url: "/src/pages/Error500Page/error500.hbs",
      title: "Ошибка 500",
    },
    error404: {
      url: "/src/pages/Error404Page/error404.hbs",
      title: "Ошибка 404",
    },
    chatProfile: {
      url: "/src/pages/ChatProfile/chatProfile.hbs",
      title: "Показать профиль",
    },
    chatCreate: {
      url: "/src/pages/ChatCreate/chatCreate.hbs",
      title: "Добавить пользователя",
    },
    chatDelete: {
      url: "/src/pages/ChatDelete/chatDelete.hbs",
      title: "Удалить чат с пользователем",
    },
    chatClear: {
      url: "/src/pages/ChatClear/chatClear.hbs",
      title: "Очистить историю чата",
    },
    chatList: {
      url: "/src/pages/ChatList/chatList.hbs",
      title: "Выбрать чат",
    },
  },
};

export { navigation };
