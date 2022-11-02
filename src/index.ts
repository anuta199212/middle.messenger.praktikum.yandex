import { LoginPage } from "@/src/pages/LoginPage";
import { SignUpPage } from "@/src/pages/SignUpPage";
import Router from "@/src/utils/Router";
import { ProfilePage } from "@/src/pages/ProfilePage";

import AuthController from "@/src/controllers/AuthController";
import { navigation } from "@/src/data/navigation";
import { ProfileEditPage } from "@/src/pages/ProfileEditPage";
import { PasswordEditPage } from "@/src/pages/PasswordEditPage";
import { Error500Page } from "@/src/pages/Error500Page";
import { Error404Page } from "@/src/pages/Error404Page";
import { ChatListPage } from "@/src/pages/ChatListPage";
import ChatsController from "@/src/controllers/ChatsController";
import { AvatarEditPage } from "@/src/pages/AvatarEditPage";
import { ChatAddUserPage } from "@/src/pages/ChatAddUserPage";
import { ChatDeleteUserPage } from "@/src/pages/ChatDeleteUserPage";

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
