import { QUERY_KEYS } from "@/constants/queryKeys";
import { getTransactionSummary } from "@/services/transaction/service";
import { useQuery } from "@tanstack/react-query";

export const useGetSummary = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SUMMARY],
    queryFn: getTransactionSummary,
  });
};
