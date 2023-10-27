import { useAppDispatch, useAppSelector } from "../store";
import { changeBoard } from "../store/boardsSlice";
import { boardsHandler, createBoardHandler } from "../store/modalsSlice";
import styles from "../styles/boards.module.scss";

const Boards = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards);

  return (
    <div>
      <p className={styles.allboards}>ALL BOARDS (0)</p>

      <ul>
        {boards.map((board, index) => (
          <li
            onClick={() => {
              dispatch(changeBoard(board.name));
            }}
            key={index}
            className={`${styles.board} ${
              board.isActive ? styles.activeBoard : ""
            }`}
          >
            <img src="./assets/icon-board.svg" alt="board" />
            <p>{board.name}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          dispatch(boardsHandler());
          dispatch(createBoardHandler());
        }}
        className={`${styles.board} ${styles.createBoard}`}
      >
        <img src="./assets/icon-board.svg" alt="board" />
        <p>+ Create New Board</p>
      </button>
    </div>
  );
};

export { Boards };
