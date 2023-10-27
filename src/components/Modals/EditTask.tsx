import { Button, SubTask } from "..";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store";
import { getActiveBoard, modifyTask } from "../../store/boardsSlice";
import { motion } from "framer-motion";
import { modalVariants } from "../../variants";

interface EditTaskProps {
  id: string;
  title: string;
  description: string;
  subtasks: SubTask[];
  status: string;
  closeModal: () => void;
}

export interface FormValues {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
}

const EditTask = ({
  id,
  title,
  description,
  subtasks: oldSubtasks,
  status,
  closeModal,
}: EditTaskProps) => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

  const { register, control, handleSubmit, formState, getValues } =
    useForm<FormValues>({
      defaultValues: {
        id: id,
        title: title,
        description: description,
        status: status,
        subtasks: oldSubtasks,
      },
    });
  const { errors } = formState;

  const {
    fields: subtasks,
    append: appendSubTask,
    remove: removeSubTask,
  } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = (data: FormValues) => {
    closeModal();
    dispatch(modifyTask({ updatedTask: data, currStatus: status }));
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="initial"
        variants={modalVariants}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: "none" }}
        className="modal-bg"
        onClick={closeModal}
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
          style={{ pointerEvents: "auto" }}
          className="modal-container"
        >
          <h3>Edit Task</h3>
          <div>
            <label htmlFor="title">Task Name</label>
            <div className="field-cont">
              <input
                maxLength={64}
                id="title"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Can't be empty",
                  },
                })}
              />
              <p className="error">{errors.title?.message}</p>
            </div>
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" {...register("description")}></textarea>
          </div>

          <ul>
            <label htmlFor={`st0`}>Subtasks</label>
            {subtasks.map((st, index) => (
              <li key={st.id} className="optional-input">
                <div className="field-cont">
                  <input
                    maxLength={28}
                    id={`st${index}`}
                    type="text"
                    {...register(`subtasks.${index}.title`, {
                      required: {
                        value: true,
                        message: "Can't be empty",
                      },
                    })}
                  />
                  <p className="error">
                    {errors.subtasks?.[index]?.title?.message}
                  </p>
                </div>
                <img
                  onClick={() => {
                    if (getValues("subtasks").length === 1) return;

                    removeSubTask(index);
                  }}
                  src="/assets/icon-cross.svg"
                  alt=""
                />
              </li>
            ))}
            <Button
              onClick={() => {
                if (getValues("subtasks").length >= 6) return;
                appendSubTask({ title: "", isCompleted: false });
              }}
            >
              + Add New Subtask
            </Button>
          </ul>

          <div>
            <label htmlFor="status"></label>
            <select id="status" {...register("status")}>
              {activeBoard?.columns.map((col) => (
                <option key={col.id} value={col.name}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">Save Task</Button>
        </form>
      </motion.div>
    </>
  );
};

export { EditTask };
