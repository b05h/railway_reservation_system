import { createFileRoute, useParams } from "@tanstack/react-router";
import {TrainSchedule} from "../../../../features/user/trains/components";
import { getTrainSchedule } from "../../../../features/user/trains/services/trainScheduleService";

export const Route = createFileRoute("/(user)/trains/$trainId/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId/schedule" });
  
  const schedule = getTrainSchedule(trainId); // fetch from service

  return <TrainSchedule trainId={trainId} schedule={schedule} />;
}
