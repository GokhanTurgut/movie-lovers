import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user";
import { RootState } from "./redux/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  // Check if we have user information in local storage
  // if we do then save that information in redux
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  if (!user.userId || !user.token) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (userId && token) {
      dispatch(
        setUser({
          userId: userId,
          token: token,
        })
      );
    }
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
