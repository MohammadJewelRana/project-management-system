import { useAppSelector } from "@/store/reduxHooks";

export const useCurrentUser = () => {
  return useAppSelector(
    (state) => state.auth.user
  );
};