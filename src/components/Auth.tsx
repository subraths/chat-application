import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
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
  console.log(isSuccess, isLoading, isFetching, data);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : data ? (
        <Outlet />
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
