import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useConnectQuery } from "../redux/apiSlice";
import { login } from "../redux/currentUserSlice";
import { setInitialChatData } from "../redux/chatSlice";

export default function Auth() {
  const { data, isSuccess, isLoading, isFetching } = useConnectQuery();
  const dispatch = useAppDispatch();

  if (data) {
    dispatch(login(data.self));
    dispatch(setInitialChatData(data.messages));
  }

  return (
    <>
      {(!isSuccess && isFetching) || isLoading ? (
        <p>loading...</p>
      ) : data ? (
        <Outlet />
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
