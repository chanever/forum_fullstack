import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import MainPage from "./Pages/MainPage/MainPage";
import About from "./Pages/About/About";
import Leadership from "./Pages/Leadership/Leadership";
import Board from "./Pages/Board/Board";
import Services from "./Pages/Services/Services";
import Contact from "./Pages/Contact/Contact";

import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";


function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
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
        path: "/our-services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
