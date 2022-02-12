import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileItem.module.css";

interface Props {
  title: string;
  id: string;
  type: string;
}

const LikedItem = (props: Props) => {
  let navigate = useNavigate();

  async function showHandler() {
    if (props.type === "movie" || props.type === "actor") {
      navigate(`/${props.type}/${props.id}`);
      return;
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <h4>{props.title}</h4>
        <Button
          color="info"
          className={styles.btn}
          size="small"
          variant="contained"
          onClick={showHandler}
        >
          <i className="fas fa-eye"></i>View
        </Button>
      </div>
    </div>
  );
};

export default LikedItem;
