import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navigation() {
  const user = useSelector((state: RootState) => state.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(
      setUser({
        userId: null,
        token: null,
      })
    );
    navigate("/");
  }

  if (user.userId && user.token) {
    return (
      <>
        <Button variant="outlined" onClick={logoutHandler}>
          Sign out
        </Button>
      </>
    );
  } else {
    return (
      <>
        <NavLink to="/signin">
          <Button variant="text">Sign In</Button>
        </NavLink>
        <NavLink to="/signup">
          <Button variant="outlined">Sign Up</Button>
        </NavLink>
      </>
    );
  }
}

export default Navigation;
