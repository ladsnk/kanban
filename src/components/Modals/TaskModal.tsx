import styles from "./taskModal.module.scss";
import { EditTask, Options } from "..";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  correctTask,
  deleteTask,
  getActiveBoard,
} from "../../store/boardsSlice";
import { SubTask } from "../SubTask";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { motion } from "framer-motion";
import { modalVariants } from "../../variants";
import { AnimatePresence } from "framer-motion";

interface TaskModalProps {
  id: string;
  title: string;
  description: string;
  subtasks: SubTask[];
  status: string;
  closeModal: () => void;
}

export interface FormValuesTaskModal {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}

const TaskModal = ({
  title,
  description,
  subtasks: oldSubtasks,
  status,
  closeModal,
  id,
}: TaskModalProps) => {
  const [options, setOptions] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

  const { register, control, handleSubmit, watch, setValue } =
    useForm<FormValuesTaskModal>({
      defaultValues: {
        id: id,
        title: title,
        description: description,
        status: status,
        subtasks: oldSubtasks,
      },
    });

  const completedSubTasks = watch("subtasks").reduce(
    (acc, st) => (st.isCompleted ? (acc = acc + 1) : acc),
    0
  );

  const { fields: subtasks } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = (data: FormValuesTaskModal) => {
    closeModal();

    dispatch(
      correctTask({
        updatedTask: data,
        oldStatus: status,
      })
    );
    closeModal();
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
    >
      <div className="modal-bg dimmed" onClick={handleSubmit(onSubmit)}>
        <form onClick={(e) => e.stopPropagation()} className="modal-container">
          <div>
            <h3 className={styles.title}>{title}</h3>
            <Options
              subject="Task"
              classEllipsis={styles.classEllipsis}
              closeModal={() => setOptions(false)}
              editHandler={() => setEditOpen(true)}
              deleteHandler={() =>
                dispatch(deleteTask({ id: id, status: status }))
              }
              isOpen={options}
              openOptions={() => setOptions(true)}
            />
          </div>

          {description && <p className={styles.desc}>{description}</p>}

          <div>
            <p className={styles.subtasksQty}>
              Subtasks ( {completedSubTasks} of {subtasks.length} )
            </p>
            {subtasks.map((subtask, index) => (
              <SubTask
                watch={watch}
                setValue={setValue}
                key={subtask.id}
                index={index}
                {...subtask}
                register={register}
              />
            ))}
          </div>

          <div>
            <label htmlFor="status">Current Status</label>
            <select
              className={styles.select}
              id="status"
              {...register("status")}
            >
              {activeBoard?.columns.map((col) => (
                <option key={col.id} value={col.name}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <DevTool control={control} />
      <AnimatePresence>
        {editOpen && (
          <EditTask
            id={id}
            title={title}
            description={description}
            subtasks={subtasks}
            status={status}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { TaskModal };
