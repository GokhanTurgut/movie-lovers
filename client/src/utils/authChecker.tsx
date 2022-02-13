import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

// Checking if user have signed in otherwise navigating to sign in.
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.userId || !user.token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

// Checking if user have not signed in otherwise navigating them to index.
export const RequireNoAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (user.userId && user.token) {
    return <Navigate to="/" />;
  }

  return children;
};
