import authService from "../services";
import { useApi } from "../../../services/useApi";
import { useRouter } from "@tanstack/react-router";

export const useSignUp = () => {
  const router = useRouter();

  return useApi({
    endpoint: authService.signUp,
    onSuccess: (responseBody) => {
      console.log(responseBody);
      router.navigate({ to: "/signin" });
    },
  });
};
