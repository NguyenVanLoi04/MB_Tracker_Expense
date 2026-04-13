import { QUERY_KEYS } from "@/constants/queryKeys";
import { getTransactions } from "@/services/transaction/service";
import { useQuery } from "@tanstack/react-query";

export const useGetListTransaction = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS],
    queryFn: getTransactions,
  });
};
