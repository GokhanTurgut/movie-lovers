import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.userId || !user.token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export const RequireNoAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.userId && user.token) {
    return <Navigate to="/" />;
  }

  return children;
};
