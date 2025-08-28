import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "../../features/authentication/components";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200">
      <SignupForm />
    </section>
  );
}
