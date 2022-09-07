import { HomePage } from "./pages/HomePage";
import * as styles from "./styles.module.scss";
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
import { navigation } from "./data/navigation";
import avatar from "/static/image-plus-outline.svg";
import profileAvatar from "/static/account-circle.svg";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app") ?? null;
  const path = document.location.pathname;

  switch (path) {
    case navigation.pages.login.url: {
      const loginPage = new LoginPage({
        styles: styles,
      });

      root?.append(loginPage.getContent() ?? "");

      loginPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.signUp.url: {
      const signUpPage = new SignUpPage({
        styles: styles,
      });

      root?.append(signUpPage.getContent() ?? "");

      signUpPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.profile.url: {
      const profilePage = new ProfilePage({
        styles: styles,
        avatar: profileAvatar,
      });

      root?.append(profilePage.getContent() ?? "");

      profilePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.avatarEdit.url: {
      const avatarEditPage = new AvatarEditPage({
        styles: styles,
      });

      root?.append(avatarEditPage.getContent() ?? "");

      avatarEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.profileEdit.url: {
      const profileEditPage = new ProfileEditPage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(profileEditPage.getContent() ?? "");

      profileEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.passwordEdit.url: {
      const passwordEditPage = new PasswordEditPage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(passwordEditPage.getContent() ?? "");

      passwordEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.error404.url: {
      const error404Page = new Error404Page({
        styles: styles,
      });

      root?.append(error404Page.getContent() ?? "");

      error404Page.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.error500.url: {
      const error500Page = new Error500Page({
        styles: styles,
      });

      root?.append(error500Page.getContent() ?? "");

      error500Page.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.chatProfile.url: {
      const chatProfilePage = new ChatProfilePage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(chatProfilePage.getContent() ?? "");

      chatProfilePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.chatCreate.url: {
      const chatCreatePage = new ChatCreatePage({
        styles: styles,
      });

      root?.append(chatCreatePage.getContent() ?? "");

      chatCreatePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.chatDelete.url: {
      const chatDeletePage = new ChatDeletePage({
        styles: styles,
      });

      root?.append(chatDeletePage.getContent() ?? "");

      chatDeletePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.chatClear.url: {
      const chatClearPage = new ChatClearPage({
        styles: styles,
      });

      root?.append(chatClearPage.getContent() ?? "");

      chatClearPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages.chatList.url: {
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
