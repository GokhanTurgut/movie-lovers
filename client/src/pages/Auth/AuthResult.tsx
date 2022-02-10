import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import { useEffect } from "react";
import styles from "./AuthResult.module.css";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userId = params.get("userId");
  const token = params.get("token");

  useEffect(() => {
    if (userId && token) {
      setTimeout(() => {
        dispatch(
          setUser({
            userId: userId as string,
            token: token as string,
          })
        );
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        navigate("/");
      }, 2000);
    }
  });

  if (!userId || !token) {
    return (
      <div className={styles.error + " container"}>
        <i className="fas fa-exclamation-circle"></i>
        <h2>Oops! Error occurred with sign in!</h2>
      </div>
    );
  }

  return (
    <div className={styles.success + " container"}>
      <i className="fas fa-check-circle"></i>
      <h2>Successful sign in! Redirecting...</h2>
    </div>
  );
};

export default AuthSuccess;
