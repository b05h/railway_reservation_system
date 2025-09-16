import { createFileRoute, useParams } from "@tanstack/react-router";
import {TrainSchedule} from "../../../../features/trains/components";
import { getTrainSchedule } from "../../../../features/trains/services/trainService";

export const Route = createFileRoute("/(user)/trains/$trainId/schedule")({
  component: SchedulePage,
});

function SchedulePage() {
  const { trainId } = useParams({ from: "/(user)/trains/$trainId/schedule" });
  
  const schedule = getTrainSchedule(trainId); // fetch from service

  return <TrainSchedule trainId={trainId} schedule={schedule} />;
}
