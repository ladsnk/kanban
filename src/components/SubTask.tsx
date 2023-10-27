import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import styles from "../styles/subTask.module.scss";
import { FormValuesTaskModal } from "./Modals/TaskModal";

export interface SubTask {
  title: string;
  isCompleted: boolean;
}

interface SubTaskProps extends SubTask {
  register: UseFormRegister<FormValuesTaskModal>;
  index: number;
  watch: UseFormGetValues<FormValuesTaskModal>;
  setValue: UseFormSetValue<FormValuesTaskModal>;
}

const SubTask = ({ title, register, index, watch, setValue }: SubTaskProps) => {
  const completed = watch(`subtasks.${index}.isCompleted`);
  const changeState = () => {
    setValue(`subtasks.${index}.isCompleted`, !completed);
  };
  return (
    <div
      onClick={changeState}
      className={`${styles.subTask} ${completed ? styles.active : ""}`}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        {...register(`subtasks.${index}.isCompleted`)}
      />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export { SubTask };
