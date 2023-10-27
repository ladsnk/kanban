import { memo } from "react";
import { Column, NewColumn } from ".";
import { useAppDispatch, useAppSelector } from "../store";
import { dropTask, getActiveBoard } from "../store/boardsSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "../styles/board.module.scss";

const Board = memo(() => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

  const handleDragAndDrop = (results: any) => {
    const { source, destination } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(dropTask(results));
  };

  return (
    <div className={styles.check}>
      {activeBoard && (
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className={styles.board}>
                  <ul className={styles.list}>
                    {activeBoard?.columns.map((col, index) => (
                      <Column
                        index={index}
                        key={col.id}
                        name={col.name}
                        id={col.id}
                        tasks={col.tasks}
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                  <NewColumn />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
});

export { Board };
