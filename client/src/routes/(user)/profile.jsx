import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../features/user/profile/components/ProfilePage";

export const Route = createFileRoute("/(user)/profile")({
  component: ProfilePage,
});
