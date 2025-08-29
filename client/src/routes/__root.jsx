import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NotFound, Nav } from "../components";

export const Route = createRootRoute({
  component: () => <RootLayout />,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
