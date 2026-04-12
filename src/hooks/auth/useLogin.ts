import { useMutation } from "@tanstack/react-query";
import { ICallbackResponse } from "../../interfaces/interface.common";
import { userLogin } from "../../services/auth/service";

export const useLogin = (callback: ICallbackResponse) => {
  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data: any, variables: any) => {
      callback.onSuccess(data, variables);
    },
    onError: (error: Error) => {
      callback.onError(error);
    },
  });
};
