import { QUERY_KEYS } from "@/constants/queryKeys";
import { createTransaction } from "@/services/transaction/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRANSACTIONS],
      });
    },
  });
};
