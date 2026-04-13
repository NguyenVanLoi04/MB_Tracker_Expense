import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { getUserProfile } from "../../services/auth/service";
import { setUser } from "../../store/slices/authSlice";

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (query.data?.data) {
      dispatch(setUser(query.data.data));
    }
  }, [query.data, dispatch]);

  return query;
};
