import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { default as WaitingNumbers } from "../../features/waitingNumbers/Index";
import NotFound from "../../features/errors/NotFound";
import Error from "../../features/errors/Error";
import TestErrors from "../../features/errors/TestErrors";
import ValidationError from "../../features/errors/ValidationError";
import About from "../../features/home/About";
import Contact from "../../features/home/Contact";
import App from "../layout/App";
import Loading from "../common/Loading";
import { default as CreateEditWaitingNumbers } from "../../features/waitingNumbers/CreateEdit";
import { default as DetailsWaitingNumbers } from "../../features/waitingNumbers/Details";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import ServerError from "../../features/errors/ServerError";
import { Index as TodoList } from "../../features/todo/Index";
import { Index as ThemeSelector } from "../../features/themeSelector/Index";
import { Editor } from "../../features/form/Editor";

import { default as CustomerLanding } from "../../features/customers/Index";
import { default as CustomerTicket } from "../../features/customers/Ticket";

// import { default as CustomerOnline } from "../../features/customers/online/Index";

import { default as Employees } from "../../features/employees/Index";

import { default as Managers } from "../../features/managers/Index";

import Regsiter from "../../features/account/Regsiter";
import { ConfirmRef } from "../../features/employees/ConfirmRef";
import QrReaderConfirm from "../../features/employees/QrReaderConfirm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "waitingNumbers", element: <WaitingNumbers /> },
          {
            path: "waitingNumbers/create",
            element: <CreateEditWaitingNumbers />,
          },
          {
            path: "waitingNumbers/edit/:id",
            element: <CreateEditWaitingNumbers />,
          },
          {
            path: "waitingNumbers/details/:id",
            element: <DetailsWaitingNumbers />,
          },

          { path: "employees", element: <Employees /> },
          { path: "confirmRef/:id", element: <ConfirmRef /> },
          { path: "qr/:id", element: <QrReaderConfirm /> },

          { path: "managers", element: <Managers /> },
        ],
      },

      { path: "customers/landing", element: <CustomerLanding /> },
      { path: "customers/ticket", element: <CustomerTicket /> },

      { path: "todolist", element: <TodoList /> },
      { path: "themeselector", element: <ThemeSelector /> },
      { path: "editor", element: <Editor /> },

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "loading", element: <Loading /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Regsiter /> },

      { path: "test-errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      // { path: "server-error", element: <Error title="Server Error" /> },
      { path: "validation-error", element: <ValidationError /> },
      { path: "unauthorized", element: <Error title="Unauthorized" /> },
      { path: "forbidden", element: <Error title="Forbidden" /> },

      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
