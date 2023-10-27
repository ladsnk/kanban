import { modalVariants } from "../../variants";
import styles from "./Options.module.scss";
import { motion } from "framer-motion";

interface OptionsProps {
  subject: string;
  closeModal: () => void;
  editHandler: () => void;
  deleteHandler: () => void;
  classOptions?: string;
  classEllipsis?: string;
  isOpen: boolean;
  openOptions: () => void;
}

const Options = ({
  closeModal,
  editHandler,
  classOptions,
  subject,
  deleteHandler,
  classEllipsis,
  isOpen,
  openOptions,
}: OptionsProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      style={{ display: "inline" }}
    >
      <div
        className={`${styles.ellipsis} ${classEllipsis ? classEllipsis : ""}`}
        onClick={() => openOptions()}
      >
        <img src="./assets/icon-vertical-ellipsis.svg" alt="ellipsis" />
      </div>
      {isOpen && (
        <>
          <div className="bg" onClick={closeModal}></div>
          <div
            onClick={closeModal}
            className={`${styles["options-container"]} ${
              classOptions ? classOptions : ""
            }`}
          >
            <p
              onClick={() => {
                editHandler();
              }}
              className={styles["edit"]}
            >
              Edit {subject}
            </p>
            <p onClick={deleteHandler} className={styles["delete"]}>
              Delete {subject}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export { Options };
