import React from "react";
import ReactDOM from "react-dom/client";
import LoginCard from "./components/LoginCard1.jsx";
import Newaccount from "./components/Newaccount.jsx"
import Issuecard from "./components/Issuecard.jsx"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from "./App.jsx";
import "./index.css";
const router = createBrowserRouter([{
  path: '/Login',
  Component:LoginCard,
    // Add your routes here
  
},{
  path: '/newaccount',
  Component: Newaccount,
  // Add your routes here
},{
  path: '/app',
  Component:App,
  // Add your routes here
},{
  path: '/issues',
  Component: Issuecard,
  // Add your routes here
},])




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
