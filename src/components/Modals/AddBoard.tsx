import { Button } from "..";
import { useAppDispatch } from "../../store";
import { createBoardHandler } from "../../store/modalsSlice";
import { createBoard } from "../../store/boardsSlice";
import uuid from "react-uuid";
import { useFieldArray, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { modalVariants } from "../../variants";

interface FormValues {
  name: string;
  columns: {
    name: string;
    tasks: [];
    id: string;
  }[];
}

const AddBoard = () => {
  const dispatch = useAppDispatch();

  const { register, control, handleSubmit, formState, getValues } =
    useForm<FormValues>({
      defaultValues: {
        name: "",
        columns: [
          { name: "Todo", tasks: [], id: uuid() },
          { name: "Doing", tasks: [], id: uuid() },
          { name: "Done", tasks: [], id: uuid() },
        ],
      },
    });

  const { errors } = formState;

  const {
    fields: columns,
    append: appendColumn,
    remove: removeColumn,
  } = useFieldArray({
    name: "columns",
    control,
  });

  const createBoardAndSend = (data: FormValues) => {
    dispatch(createBoardHandler());

    dispatch(createBoard({ ...data, isActive: false }));
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      onClick={() => dispatch(createBoardHandler())}
      className="modal-bg dimmed"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="modal-container"
        onSubmit={handleSubmit(createBoardAndSend)}
      >
        <h2>Add New Board</h2>
        <div>
          <label htmlFor="name">Board Name</label>
          <div className="field-cont">
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Can't be empty",
                },
                maxLength: {
                  value: 16,
                  message: "Too many characters",
                },
              })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
        </div>

        <ul>
          <label htmlFor="column0">Board Columns</label>

          {columns.map((col, index) => (
            <li key={col.id} className="optional-input">
              <div className="field-cont">
                <input
                  id={`column${index}`}
                  maxLength={12}
                  type="text"
                  {...register(`columns.${index}.name`, {
                    required: {
                      value: true,
                      message: "Can't be empty",
                    },
                  })}
                />
                <p className="error">
                  {errors.columns?.[index]?.name?.message}
                </p>
              </div>
              <img
                onClick={() => {
                  if (getValues("columns").length === 1) return;

                  removeColumn(index);
                }}
                src="./assets/icon-cross.svg"
                alt=""
              />
            </li>
          ))}
          <Button
            onClick={() => {
              if (getValues("columns").length >= 4) return;
              appendColumn({ name: "", tasks: [], id: uuid() });
            }}
          >
            + Add New Column
          </Button>
        </ul>

        <Button type="submit">Create New Board</Button>
      </form>
    </motion.div>
  );
};

export { AddBoard };
