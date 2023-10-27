import { useAppDispatch } from "../store";
import { editBoardHandler } from "../store/modalsSlice";
import styles from "../styles/newColumn.module.scss";

const NewColumn = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(editBoardHandler())}
      className={styles.newColumn}
    >
      + New Column
    </div>
  );
};

export { NewColumn };
