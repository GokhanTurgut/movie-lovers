import styles from "./Comment.module.css";

interface Props {
  author: string;
  content: string;
  createdAt: string;
}

const Comment = (props: Props) => {
  const commentDate = new Date(props.createdAt);

  return (
    <div className={styles.comment}>
      <p>{props.content}</p>
      <h4>
        By {props.author} at {commentDate.toLocaleDateString()}
      </h4>
    </div>
  );
};

export default Comment;
