import { Boards, ToggleSwitch } from "..";
import { useAppDispatch } from "../../store";
import { boardsHandler } from "../../store/modalsSlice";
import { modalVariants } from "../../variants";
import style from "./boardsModal.module.scss";
import { motion } from "framer-motion";

const BoardsModal = () => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
    >
      <div className="bg" onClick={() => dispatch(boardsHandler())}></div>
      <div className={style["boards-container"]}>
        <Boards />

        <ToggleSwitch />
      </div>
    </motion.div>
  );
};

export { BoardsModal };
