import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/Register";
import Router from "./utils/Router";
import { ProfilePage } from "./pages/Profile";

import AuthController from "./controllers/AuthController";
import { navigation } from "./data/navigation";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(navigation.pages[0].url, LoginPage)
    .use(navigation.pages[1].url, RegisterPage)
    .use(navigation.pages[2].url, ProfilePage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case navigation.pages[0].url:
    case navigation.pages[1].url:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(navigation.pages[2].url);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(navigation.pages[0].url);
    }
  }
});
