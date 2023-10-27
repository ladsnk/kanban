import { Task } from ".";
import { TaskProps } from "./Task";
import styles from "../styles/column.module.scss";
import { Droppable } from "react-beautiful-dnd";

export interface ColumnProps {
  id: string;
  name: string;
  tasks: TaskProps[];
  index: number;
}

const Column = ({ name, tasks, id }: ColumnProps) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className={styles.column}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3 className={styles.name}>
            {name} ({tasks.length})
          </h3>
          <ul>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                status={name}
                title={task.title}
                description={task.description}
                subtasks={task.subtasks}
                id={task.id}
                index={index}
              />
            ))}
          </ul>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export { Column };
