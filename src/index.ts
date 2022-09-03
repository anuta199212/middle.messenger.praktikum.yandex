import { HomePage } from "./pages/HomePage";
import { navigation } from "./data/navigation";
import styles from "./styles.module.scss";
import { chatList } from "./data/chatList";
import { messageList } from "./data/messageList";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AvatarEditPage } from "./pages/AvatarEditPage";
import { PasswordEditPage } from "./pages/PasswordEditPage";
import { Error404Page } from "./pages/Error404Page";
import { Error500Page } from "./pages/Error500Page";
import { ChatProfilePage } from "./pages/ChatProfilePage";
import { ChatCreatePage } from "./pages/ChatCreatePage";
import { ChatDeletePage } from "./pages/ChatDeletePage";
import { ChatClearPage } from "./pages/ChatClearPage";
import { ChatListPage } from "./pages/ChatListPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app") ?? null;
  const path = document.location.pathname;

  switch (path) {
    case "/src/pages/LoginPage/login.hbs": {
      const loginPage = new LoginPage({
        styles: styles,
      });

      root?.append(loginPage.getContent() ?? "");

      loginPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/SignUpPage/signUp.hbs": {
      const signUpPage = new SignUpPage({
        styles: styles,
      });

      root?.append(signUpPage.getContent() ?? "");

      signUpPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ProfilePage/profile.hbs": {
      const profilePage = new ProfilePage({
        styles: styles,
      });

      root?.append(profilePage.getContent() ?? "");

      profilePage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/AvatarEditPage/avatarEdit.hbs": {
      const avatarEditPage = new AvatarEditPage({
        styles: styles,
      });

      root?.append(avatarEditPage.getContent() ?? "");

      avatarEditPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ProfileEditPage/profileEdit.hbs": {
      const profileEditPage = new ProfileEditPage({
        styles: styles,
      });

      root?.append(profileEditPage.getContent() ?? "");

      profileEditPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/PasswordEditPage/passwordEdit.hbs": {
      const passwordEditPage = new PasswordEditPage({
        styles: styles,
      });

      root?.append(passwordEditPage.getContent() ?? "");

      passwordEditPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/Error404Page/error404.hbs": {
      const error404Page = new Error404Page({
        styles: styles,
      });

      root?.append(error404Page.getContent() ?? "");

      error404Page.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/Error500Page/error500.hbs": {
      const error500Page = new Error500Page({
        styles: styles,
      });

      root?.append(error500Page.getContent() ?? "");

      error500Page.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ChatProfile/chatProfile.hbs": {
      const chatProfilePage = new ChatProfilePage({
        styles: styles,
      });

      root?.append(chatProfilePage.getContent() ?? "");

      chatProfilePage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ChatCreate/chatCreate.hbs": {
      const chatCreatePage = new ChatCreatePage({
        styles: styles,
      });

      root?.append(chatCreatePage.getContent() ?? "");

      chatCreatePage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ChatDelete/chatDelete.hbs": {
      const chatDeletePage = new ChatDeletePage({
        styles: styles,
      });

      root?.append(chatDeletePage.getContent() ?? "");

      chatDeletePage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ChatClear/chatClear.hbs": {
      const chatClearPage = new ChatClearPage({
        styles: styles,
      });

      root?.append(chatClearPage.getContent() ?? "");

      chatClearPage.dispatchComponentDidMount();

      break;
    }
    case "/src/pages/ChatList/chatList.hbs": {
      const chatListPage = new ChatListPage({
        styles: styles,
        chatList: chatList,
        messageList: messageList,
      });

      root?.append(chatListPage.getContent() ?? "");

      chatListPage.dispatchComponentDidMount();

      break;
    }
    case "/":
    default: {
      const homePage = new HomePage({
        navigation: navigation,
        styles: styles,
      });

      root?.append(homePage.getContent() ?? "");

      homePage.dispatchComponentDidMount();
      break;
    }
  }
});
