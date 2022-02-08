import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user)
  return (
    <div>
      <div>Hello world!</div>
      <h3>{user.userId}</h3>
      <h3>{user.token}</h3>
    </div>
  );
};

export default Home;
