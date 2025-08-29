import authService from "../services";
import { useAuthStore } from "../../../store/useAuthStore";
import { useApi } from "../../../services/useApi";
import { useRouter } from "@tanstack/react-router";

export const useSignIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useApi({
    endpoint: authService.signIn,
    onSuccess: (responseBody) => {
      setAuth(responseBody.data.token);
      router.navigate({ to: "/dashboard" });
    },
  });
};
