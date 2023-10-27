import { useState } from "react";

import styles from "../styles/task.module.scss";
import { SubTask, TaskModal } from ".";
import { Draggable } from "react-beautiful-dnd";
import { AnimatePresence } from "framer-motion";
export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
}

const Task = ({
  title,
  description,
  status,
  subtasks,
  id,
  index,
}: TaskProps & { index: number }) => {
  const [modal, setModal] = useState(false);

  const completedSTasks = subtasks.reduce(
    (accumulator, el) => accumulator + (el.isCompleted ? 1 : 0),
    0
  );

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <li
            className={styles.item}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className={styles.task}
              onClick={() => setModal((prev) => !prev)}
            >
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtasks}>
                {completedSTasks} of {subtasks.length} subtasks
              </p>
            </div>
          </li>
        )}
      </Draggable>
      <AnimatePresence>
        {modal && (
          <TaskModal
            title={title}
            description={description}
            subtasks={subtasks}
            status={status}
            closeModal={() => setModal(false)}
            id={id}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export { Task };
