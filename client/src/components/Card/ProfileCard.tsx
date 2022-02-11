import { ButtonGroup, Button } from "@mui/material";
import styles from "./ProfileCard.module.css";

interface Props {
  title: string;
}

const ProfileCard = (props: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <h4>{props.title}</h4>
        <ButtonGroup variant="contained" size="small" color="warning">
          <Button color="info" className={styles.btn}>
            <i className="fas fa-eye"></i>View
          </Button>
          <Button color="warning" className={styles.btn}>
            <i className="fas fa-edit"></i>Edit
          </Button>
          <Button color="error" className={styles.btn}>
            <i className="fas fa-trash"></i>Delete
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProfileCard;
