import { QUERY_KEYS } from "@/constants/queryKeys";
import { ICallback } from "@/interfaces/interface.common";
import { createTransaction } from "@/services/transaction/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = (callback: ICallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRANSACTIONS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SUMMARY],
      });
      if (callback?.onSuccess) {
        callback.onSuccess();
      }
    },
    onError: () => {
      if (callback?.onError) {
        callback.onError();
      }
    },
  });
};
