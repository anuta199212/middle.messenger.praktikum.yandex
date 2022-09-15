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
import avatar from "/static/image-plus-outline.svg";
import profileAvatar from "/static/account-circle.svg";
import { navigation } from "./data/navigation";
import { firstName } from "./data/profile";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app") ?? null;
  const path = document.location.pathname;

  switch (path) {
    case navigation.pages[0].url: {
      const loginPage = new LoginPage({
        styles: styles,
      });

      root?.append(loginPage.getContent() ?? "");

      loginPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[1].url: {
      const signUpPage = new SignUpPage({
        styles: styles,
      });

      root?.append(signUpPage.getContent() ?? "");

      signUpPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[2].url: {
      const profilePage = new ProfilePage({
        styles: styles,
        avatar: profileAvatar,
        firstName: firstName,
      });

      root?.append(profilePage.getContent() ?? "");

      profilePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[3].url: {
      const avatarEditPage = new AvatarEditPage({
        styles: styles,
      });

      root?.append(avatarEditPage.getContent() ?? "");

      avatarEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[4].url: {
      const profileEditPage = new ProfileEditPage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(profileEditPage.getContent() ?? "");

      profileEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[5].url: {
      const passwordEditPage = new PasswordEditPage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(passwordEditPage.getContent() ?? "");

      passwordEditPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[7].url: {
      const error404Page = new Error404Page({
        styles: styles,
      });

      root?.append(error404Page.getContent() ?? "");

      error404Page.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[6].url: {
      const error500Page = new Error500Page({
        styles: styles,
      });

      root?.append(error500Page.getContent() ?? "");

      error500Page.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[8].url: {
      const chatProfilePage = new ChatProfilePage({
        styles: styles,
        avatar: avatar,
      });

      root?.append(chatProfilePage.getContent() ?? "");

      chatProfilePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[9].url: {
      const chatCreatePage = new ChatCreatePage({
        styles: styles,
      });

      root?.append(chatCreatePage.getContent() ?? "");

      chatCreatePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[10].url: {
      const chatDeletePage = new ChatDeletePage({
        styles: styles,
      });

      root?.append(chatDeletePage.getContent() ?? "");

      chatDeletePage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[11].url: {
      const chatClearPage = new ChatClearPage({
        styles: styles,
      });

      root?.append(chatClearPage.getContent() ?? "");

      chatClearPage.dispatchComponentDidMount();

      break;
    }
    case navigation.pages[12].url: {
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
