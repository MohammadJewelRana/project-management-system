import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "./store";

// DISPATCH
export const useAppDispatch =
  () => useDispatch<AppDispatch>();

// SELECTOR
export const useAppSelector: TypedUseSelectorHook<
  RootState
> = useSelector;