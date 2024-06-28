// & С МОЕГО СОЛО ПРОЕКТА:
import React from "react";
import "./App.css";
import Root from "./Root";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import Story from "./pages/Story/Story";

function App() {
  const [user, setUser] = useState();
  const [inputs, setInputs] = useState({ goodWord: "", badWord: "" });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setAccessToken(accessToken);
        try {
          const res = await axiosInstance(
            `${import.meta.env.VITE_API}/tokens/refresh`
          );
          setUser(res.data.user);
          setAccessToken(res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
        } catch (error) {
          console.error("Error refreshing tokens", error);
        } finally {
          setLoading(false); // Устанавливаем isLoading в false после завершения загрузки
        }
      }
    };

    initializeUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <StartPage user={user} />,
        },
        {
          path: "/home",
          element: (
            <HomePage
              user={user}
              setUser={setUser}
              inputs={inputs}
              setInputs={setInputs}
            />
          ),
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
          element: isLoading ? (
            <Navigate to="/" />
          ) : (
            <ProfilePage_skeleton
              user={user}
              setUser={setUser}
              inputs={inputs}
              setInputs={setInputs}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
