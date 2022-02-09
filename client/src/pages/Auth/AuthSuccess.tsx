import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import styles from "./AuthSuccess.module.css";
import { useEffect } from "react";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const userId = params.get("userId");
  const token = params.get("token");

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(
        setUser({
          userId: userId as string,
          token: token as string,
        })
      );
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, userId, token]);

  return (
    <div className={styles.success + " container"}>
      <i className="fas fa-check-circle"></i>
      <h2>Successful sign in! Redirecting...</h2>
    </div>
  );
};

export default AuthSuccess;
