import { createFileRoute } from "@tanstack/react-router";
import PassengersPage from "../../../../../features/user/trains/components/PassengersPage";

export const Route = createFileRoute("/(user)/trains/$trainId/book/passengers")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PassengersPage />;
}