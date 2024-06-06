/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Droppable = (props) => {
  const { children, section, className, disabled } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section._id, disabled });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={`border p-3 ${className ?? ''}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default Droppable;
