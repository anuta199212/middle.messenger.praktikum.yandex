import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import Router from "./utils/Router";
import { ProfilePage } from "./pages/ProfilePage";

import AuthController from "./controllers/AuthController";
import { navigation } from "./data/navigation";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { PasswordEditPage } from "./pages/PasswordEditPage";
import { Error500Page } from "./pages/Error500Page";
import { Error404Page } from "./pages/Error404Page";
import { ChatListPage } from "./pages/ChatListPage";
import ChatsController from "./controllers/ChatsController";
import { AvatarEditPage } from "./pages/AvatarEditPage";
import { ChatAddUserPage } from "./pages/ChatAddUserPage";
import { ChatDeleteUserPage } from "./pages/ChatDeleteUserPage";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(navigation.pages[0].url, LoginPage)
    .use(navigation.pages[1].url, SignUpPage)
    .use(navigation.pages[2].url, ProfilePage)
    .use(navigation.pages[3].url, AvatarEditPage)
    .use(navigation.pages[4].url, ProfileEditPage)
    .use(navigation.pages[5].url, PasswordEditPage)
    .use(navigation.pages[6].url, Error500Page)
    .use(navigation.pages[7].url, Error404Page)
    .use(navigation.pages[9].url, ChatDeleteUserPage)
    .use(navigation.pages[10].url, ChatAddUserPage)
    .use(navigation.pages[12].url, ChatListPage);

  try {
    await AuthController.fetchUser();
    await ChatsController.getchats();
  } catch (e) {
    Router.go(navigation.pages[0].url);
  }

  Router.start();
});
