import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { RootState } from "../../redux/store";
import ChangePassword from "./ChangePassword";
import { UserData } from "../../types/global";

const Profile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userData, setUserData] = useState<UserData | any>();
  
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    async function getUserData() {
      try {
        const result = await axios.get("http://localhost:5000/user", config);
        if (result.status === 200) {
          setUserData(result.data.user);
        }
      } catch (err: any) {
        console.error(err);
      }
    }
    getUserData()
  }, [user.token]);

  function showHandler() {
    setShowPasswordForm((state) => {
      return !state;
    });
  }

  let passwordForm = null;
  if (showPasswordForm) {
    passwordForm = <ChangePassword />;
  }
  
  if (!userData) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container profile">
        <div className="profile-information">
          <h3>Profile</h3>
          <h5>First Name: {userData ? userData.firstName : ""}</h5>
          <h5>Last Name: {userData ? userData.lastName : ""}</h5>
          <h5>Email: {userData ? userData.email : ""}</h5>
        </div>
        <div className="profile-password">
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={showHandler}
          >
            {showPasswordForm ? "Cancel" : "Change Password"}
          </Button>
          {passwordForm}
        </div>
      </div>
      <div className="container my-movies">
        <h3>My Movies</h3>
      </div>
      <div className="container my-actors">
        <h3>My Actors</h3>
      </div>
    </div>
  );
};

export default Profile;
