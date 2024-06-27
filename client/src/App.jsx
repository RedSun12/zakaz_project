// & С МОЕГО СОЛО ПРОЕКТА:
import React from "react";
import "./App.css";
import Root from "./Root";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage_skeleton from "./pages/ProfilePage/ProfilePage_skeleton";
// import ChanneList from "./pages/ChanneList"; // ~ ШАБЛОН: добавь свои ссылки на страницы
// import ChannelPage from "./pages/ChannelPage";// ~ ШАБЛОН: добавь свои ссылки на страницы
// import Subscriptions from "./pages/Subscriptions";
import Page404 from "./components/Page404/Page404";

function App() {
  const [user, setUser] = useState();
  // console.log("🟩ЮЗЕР FROM APP.JSX user", user);
  const [subscribes, setSubscribes] = useState([]); // ^ СОСТОЯНИЕ ПОДПИСОК

  useEffect(() => {
    axiosInstance(`${import.meta.env.VITE_API}/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <StartPage user={user} />, // у element: <HomePage />,
        },
        {
          path: "/home",
          element: <HomePage user={user} setUser={setUser} />,
        },
        {
          path: "/signin",
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: "/signup",
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: "*",
          element: <Page404 />,
        },
        {
          path: "/profile",
          element: user ? (
            <ProfilePage_skeleton
              user={user}
              subscribes={subscribes}
              setSubscribes={setSubscribes}
            />
          ) : (
            <Navigate to="/" />
          ),
        },

        // ~-------------ВЫШЕ ЭТО БАЗА----------------------------------------
        // {
        //   path: "/channels", // ~ ШАБЛОН: добавь свои ссылки на страницы
        //   element: <ChanneList user={user} setUser={setUser} />,
        // },
        // {
        //   path: "/channels/:id", // ~ ШАБЛОН: добавь свои ссылки на страницы
        //   element: <ChannelPage user={user} />,// ~ ШАБЛОН: добавь свои страницы
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
