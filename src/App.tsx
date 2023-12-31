import { FC, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom"; // Import Outlet
import Auth from "./pages/Auth";

import { Dashboard } from "./pages/Dashboard";
import { useAppDispatch } from "./hooks/hooks";
import { logoutUser, setUser } from "./store/authReducer/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import AppHeader from "./components/AppHeader";
import TicketSale from "./pages/TicketSale"
import TicketForm from "./pages/TicketForm";
import Generated from "./pages/GeneratedTickets";
import Contracts from "./pages/Contracts";
import Contract from "./pages/Contract";
import { userApi } from "./store/userReducer/userApi";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider } from "@mui/material";

interface RouteConfig {
  path: string;
  component: FC;
  isPrivate?: boolean;
}

const routeConfigs: RouteConfig[] = [
  { path: "/", component: () => <Navigate to="/dashboard" replace /> },
  { path: "/auth", component: Auth },
  { path: "/dashboard", component: Dashboard, isPrivate: true },
  { path: "/create_ticket", component: TicketForm, isPrivate: true },
  { path: "/generated", component: Generated, isPrivate: true },
  { path: "/contracts", component: Contracts, isPrivate: true },
  // isPrivate should be true for "/contract/:id" route
  { path: "/contract/:id", component: Contract, isPrivate: true },
  { path: "/ticket-sale/:id", component: TicketSale, isPrivate: true }
];

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useThemeContext();
  const { isError: isUserGetDataError } = userApi.useGetUserInformationQuery('');

  useEffect(() => {
    if (isUserGetDataError) {
      dispatch(logoutUser())
    }
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    dispatch(setUser(token));
  }, [dispatch, isUserGetDataError]);

  return (
    <div>
      <Routes>
        {routeConfigs.map((route, index) => {
          const { path, component: Component, isPrivate } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute>
                    {/* Check if the path is "/contract/:id", if yes, render the component without AppHeader */}
                    {path === "/contract/:id" && "/return-contract/:id" ? (
                      <Component />
                    ) : (
                      <ThemeProvider theme={theme}>
                        <AppHeader>
                          <Component />
                        </AppHeader>
                      </ThemeProvider>
                    )}
                  </PrivateRoute>
                ) : (
                  <ThemeProvider theme={theme}>
                    <Component />
                  </ThemeProvider>
                )
              }
            />
          );
        })}
        {/* Use Outlet to render the child routes of "/contract/:id" */}
        <Route path="/contract/:id/*" element={<Outlet />} />
      </Routes>
    </div>
  );
};

export default App;