import { createFileRoute } from "@tanstack/react-router";
import { TrainForm} from "../../../features/trains/components";
export const Route = createFileRoute("/(user)/trains/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200">
      <TrainForm />
    </section>
  );
}
