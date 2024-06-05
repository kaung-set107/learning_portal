/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SectionCardWrapper = (props) => {
  const { children, section } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section._id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
    className="border p-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default SectionCardWrapper;
