import "./App.css";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import MainPage from "./Pages/MainPage/MainPage";
import About from "./Pages/About/About";
import Leadership from "./Pages/Leadership/Leadership";
import Board from "./Pages/Board/Board";
import SinglePost from "./Pages/SinglePost/SinglePost";
import Services from "./Pages/Services/Services";
import Contact from "./Pages/Contact/Contact";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPosts from "./Pages/Admin/AdminPosts";
import AdminContacts from "./Pages/Admin/AdminContacts";
import AdminCreatePost from "./Pages/Admin/AdminCreatePost";
import AdminEditPost from "./Pages/Admin/AdminEditPost";

import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import AdminNavBar from "./Components/NavBar/AdminNavBar";



function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true }
        );
        setIsAuthenticated(response.data.isValid);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />;
}

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true }
        );

        setIsAuthenticated(response.data.isValid);
        setUser(response.data.user);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/admin" replace />
  );
}

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/leadership",
        element: <Leadership />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/board/:id",
        element: <SinglePost />,
      },
      {
        path: "/our-services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "posts", element: <AdminPosts /> },
          { path: "contacts", element: <AdminContacts /> },
          { path: "create-post", element: <AdminCreatePost /> },
          { path: "edit-post/:id", element: <AdminEditPost /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
