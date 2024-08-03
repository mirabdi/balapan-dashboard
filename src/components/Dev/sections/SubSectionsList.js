import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const SubSectionsList = ({ subSections, sectionId, onReorder }) => {
  const [currSubSections, setCurrSubSections] = useState(subSections);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newSubSections = reorder(
      currSubSections,
      result.source.index,
      result.destination.index
    );
    setCurrSubSections(newSubSections);
    onReorder(sectionId, newSubSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`subSections-${sectionId}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {currSubSections.map((subSection, index) => (
              <Draggable key={subSection.url} draggableId={subSection.url} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="text-gray-600 text-sm my-1 transition-colors duration-200"
                  >
                    {subSection.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SubSectionsList;
