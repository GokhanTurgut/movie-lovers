import { Button } from "@mui/material";
import styles from "./HomeCard.module.css";

interface Props {
  title: string;
  imageURL: string;
}

const HomeCard = (props: Props) => {
  return (
    <div className={styles.homeCard}>
      <img src={props.imageURL} alt="Poster/Actor" />
      <h4>{props.title}</h4>
      <Button variant="contained">View</Button>
    </div>
  );
};

export default HomeCard;
