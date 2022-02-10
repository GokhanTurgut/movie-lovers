import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/user";
import { useNavigate, NavLink } from "react-router-dom";

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
    localStorage.clear();
    navigate("/");
  }

  if (user.userId && user.token) {
    return (
      <>
        <NavLink to="/addActor">
          <Button variant="text">Add Actor</Button>
        </NavLink>
        <NavLink to="/addMovie">
          <Button variant="text">Add Movie</Button>
        </NavLink>
        <NavLink to="/profile">
          <Button variant="text">Profile</Button>
        </NavLink>
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
