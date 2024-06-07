/* eslint-disable react/prop-types */
import { closestCorners, DndContext } from "@dnd-kit/core";

const Draggable = (props) => {
  const { onDragEnd, onDragStart, children } = props;

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetection={closestCorners}
    >
      {children}
    </DndContext>
  );
};

export default Draggable;
