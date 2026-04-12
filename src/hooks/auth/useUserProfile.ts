import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getUserProfile } from "../../services/auth/service";

export const useUserProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: () => getUserProfile(),
    // Optional: Only fetch if authenticated or other conditions
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
