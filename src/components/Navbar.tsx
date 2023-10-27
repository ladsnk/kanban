import { useAppDispatch, useAppSelector } from "../store";
import styles from "../styles/navbar.module.scss";
import { BoardsModal, Options, AddTask, Button, EditBoard, AddBoard } from ".";
import {
  addTaskHandler,
  boardsHandler,
  editBoardHandler,
  optionsHandler,
} from "../store/modalsSlice";
import { deleteBoard, getActiveBoard } from "../store/boardsSlice";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

  // states for modals
  const boards = useAppSelector((state) => state.modals.boards);
  const addTask = useAppSelector((state) => state.modals.addTask);
  const options = useAppSelector((state) => state.modals.options);
  const editBoard = useAppSelector((state) => state.modals.editBoard);
  const createBoard = useAppSelector((state) => state.modals.createBoard);

  // icon depending on theme
  const theme = useAppSelector((state) => state.theme);
  const checkTheme = () => {
    if (theme === "dark-theme") {
      return "./assets/logo-light.svg";
    } else {
      return "./assets/logo-dark.svg";
    }
  };

  return (
    <>
      <div className={styles.helper}></div>
      {/* <div className={styles.block}></div> */}
      <nav className={styles["nav"]}>
        <picture className={styles["logo"]}>
          <source media="(min-width:1150px)" srcSet={checkTheme()} />
          <img src="./assets/logo-mobile.svg" alt="logo" />
        </picture>

        <div className={styles["active-board"]}>
          <h2 className={styles["board-name"]}>{activeBoard?.name}</h2>

          <div className={styles["add-task-cont"]}>
            <img
              className={styles.chevron}
              src="./assets/icon-chevron-down.svg"
              alt="arrow"
              onClick={() => dispatch(boardsHandler())}
            />
            <AnimatePresence>{boards && <BoardsModal />}</AnimatePresence>
            {/* <AnimatePresence>{createBoard && <AddBoard />}</AnimatePresence> */}
          </div>
        </div>
        <AnimatePresence>{createBoard && <AddBoard />}</AnimatePresence>

        <Button
          className={styles["add-task"]}
          onClick={() => dispatch(addTaskHandler())}
        >
          <img src="./assets/icon-add-task-mobile.svg" alt="add" />
          <p>Add New Task</p>
        </Button>
        <AnimatePresence>{addTask && <AddTask />}</AnimatePresence>

        <AnimatePresence>
          <Options
            subject="Board"
            classOptions={styles.navOptions}
            classEllipsis={styles.ellipsis}
            deleteHandler={() => {
              if (activeBoard) dispatch(deleteBoard(activeBoard.name));
            }}
            editHandler={() => dispatch(editBoardHandler())}
            closeModal={() => dispatch(optionsHandler())}
            isOpen={options}
            openOptions={() => dispatch(optionsHandler())}
          />
        </AnimatePresence>
        <AnimatePresence>{editBoard && <EditBoard dimmed />}</AnimatePresence>
      </nav>
    </>
  );
};

export { Navbar };
