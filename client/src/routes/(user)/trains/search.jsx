import { createFileRoute} from "@tanstack/react-router";
import {TrainSearchbySource} from "../../../features/user/trains/components"
export const Route = createFileRoute("/(user)/trains/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div><TrainSearchbySource/></div>
}