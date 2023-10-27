import { Button } from "..";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTaskHandler } from "../../store/modalsSlice";
import { addTask, getActiveBoard } from "../../store/boardsSlice";
import uuid from "react-uuid";
import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { modalVariants } from "../../variants";

interface FormValues {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
    id: string;
  }[];
}

const AddTask = () => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const firstColumn = activeBoard?.columns[0].name;

  const { register, control, handleSubmit, formState, getValues } =
    useForm<FormValues>({
      defaultValues: {
        id: uuid(),
        title: "",
        description: "",
        status: firstColumn,
        subtasks: [{ title: "", isCompleted: false, id: uuid() }],
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

  const addTaskAndSend = (data: FormValues) => {
    dispatch(addTask(data));
    dispatch(addTaskHandler());
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      className="modal-bg dimmed"
      onClick={() => {
        dispatch(addTaskHandler());
      }}
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit(addTaskAndSend)}
        className="modal-container"
        noValidate
      >
        <h2>Add New Task</h2>

        <div>
          <label htmlFor="title">Task Name</label>
          <div className="field-cont">
            <input
              maxLength={64}
              type="text"
              id="title"
              placeholder="e.g. Take a coffee break"
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

        <div className="input-cont">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register("description")}></textarea>
        </div>

        <ul>
          {subtasks.map((task, index) => (
            <li key={task.id} className="optional-input">
              <div className="field-cont">
                <input
                  maxLength={28}
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
                src="./assets/icon-cross.svg"
                alt=""
              />
            </li>
          ))}
          <Button
            onClick={() => {
              if (getValues("subtasks").length >= 6) return;
              appendSubTask({ title: "", isCompleted: false, id: uuid() });
            }}
          >
            + Add New Subtask
          </Button>
        </ul>

        <div>
          <label htmlFor="status">Current Status</label>
          <select id="status" {...register("status")}>
            {activeBoard?.columns.map((col, index) => (
              <option key={index} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Create Task</Button>
      </form>
    </motion.div>
  );
};

export { AddTask };
