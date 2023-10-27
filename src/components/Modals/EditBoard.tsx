import { Button } from "..";
import { useAppDispatch, useAppSelector } from "../../store";
import { editBoardHandler } from "../../store/modalsSlice";
import { useFieldArray, useForm } from "react-hook-form";
import uuid from "react-uuid";
import { editBoard, getActiveBoard } from "../../store/boardsSlice";
import { motion } from "framer-motion";
import { modalVariants } from "../../variants";

interface FormValues {
  id: string;
  name: string;
  columns: {
    name: string;
    tasks: [];
    id: string;
  }[];
}

const EditBoard = ({ dimmed }: { dimmed?: boolean }) => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

  const { register, control, handleSubmit, formState, getValues } =
    useForm<FormValues>({
      defaultValues: {
        id: uuid(),
        name: activeBoard?.name,
        columns: activeBoard?.columns.map((col) => ({
          name: col.name,
          tasks: [],
          id: uuid(),
        })),
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

  const applyChanges = (data: FormValues) => {
    dispatch(editBoardHandler());
    dispatch(editBoard(data));
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="initial"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      className={`modal-bg ${dimmed ? "dimmed" : ""}`}
      onClick={() => dispatch(editBoardHandler())}
    >
      <form
        noValidate
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(applyChanges)}
        className="modal-container"
      >
        <h2>Edit Board</h2>

        <div>
          <label htmlFor="name">Board Name</label>
          <div className="field-cont">
            <input
              type="text"
              id="name"
              placeholder={activeBoard?.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "Can't be empty",
                },
                maxLength: {
                  value: 18,
                  message: "Too many characters",
                },
                validate: {
                  notBlackList: (fieldValue) => {
                    return (
                      (fieldValue !== "admin" && fieldValue !== "adminchik") ||
                      "currently unavailable"
                    );
                  },
                },
              })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
        </div>
        <div>
          <label htmlFor="column0">Board Columns</label>
          {columns.map((col, index) => (
            <li key={col.id} className="optional-input">
              <div className="field-cont">
                <input
                  type="text"
                  id={`column${index}`}
                  {...register(`columns.${index}.name`, {
                    required: {
                      value: true,
                      message: "Can't be empty",
                    },
                    maxLength: {
                      value: 12,
                      message: "Too many characters",
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
              if (getValues("columns").length >= 9) return;
              appendColumn({ name: "", tasks: [], id: uuid() });
            }}
          >
            + Add New Column
          </Button>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </motion.div>
  );
};

export { EditBoard };
