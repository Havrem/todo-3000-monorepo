import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Background } from "./layouts/Background";
import { Public } from "./layouts/Public";
import { Login } from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Protected } from "./layouts/Protected";
import { Dashboard } from "./pages/Dashboard";
import { Todos } from "./pages/Todos";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ padding: "0.5rem" }}
        transition={Bounce}
      />
      <Background>
        <Outlet />
      </Background>
    </>
  ),
});

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: Public,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: Protected,
});

const homeRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/",
  component: Login,
});

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/register",
  component: Register,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: Dashboard,
});

const todosRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/todos",
  component: Todos,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([loginRoute, registerRoute, homeRoute]),
  protectedRoute.addChildren([dashboardRoute, todosRoute, profileRoute]),
]);

export const router = createRouter({ routeTree });
