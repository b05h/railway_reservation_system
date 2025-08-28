import { createFileRoute } from "@tanstack/react-router";
import { SigninForm } from "../../features/authentication/components";

export const Route = createFileRoute("/(auth)/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200">
      <SigninForm />
    </section>
  );
}
