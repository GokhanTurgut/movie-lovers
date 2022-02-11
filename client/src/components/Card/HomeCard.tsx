import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./HomeCard.module.css";

interface Props {
  id: string;
  title: string;
  imageURL: string;
  type: string;
}

const HomeCard = (props: Props) => {
  return (
    <div className={styles.homeCard}>
      <img src={props.imageURL} alt={`${props.title}`} />
      <h4>{props.title}</h4>
      <NavLink to={`/${props.type}/${props.id}`}>
        <Button variant="contained" className={styles.btn}>
          <i className="fas fa-eye"></i> View
        </Button>
      </NavLink>
    </div>
  );
};

export default HomeCard;
