import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStateContext } from 'contexts/ContextProvider';
import { BASE_URL } from 'data/config';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  const priorities = list.map((item) => item.priority);
  priorities.sort((a, b) => a - b);
  for (let i = 0; i < result.length; i++) {
    result[i].priority = priorities[i];
  }
  return result;
};

const SectionsList = ({ sections, title, selectHandler }) => {
  const [currSections, setCurrSections] = useState(sections);
  const { showToast } = useStateContext();

  useEffect(() => {
    setCurrSections(sections);
  }, [sections]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const newSections = reorder(
      currSections,
      result.source.index,
      result.destination.index
    );
    setCurrSections(newSections);

    try {
      const token = "token";  // Ensure you have the correct token
      const response = await fetch(BASE_URL + "/dashboard/admin-api/sections/update-priority", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ sections: newSections }),
      });

      if (response.ok) {
        showToast({
          title: 'Success!',
          content: 'Sections order updated.',
          cssClass: 'e-toast-success',
          icon: 'e-success toast-icons'
        });
      } else {
        const errorData = await response.json();
        showToast({
          title: 'Error!',
          content: errorData.message || 'Failed to update sections order.',
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons'
        });
      }
    } catch (error) {
      showToast({
        title: 'Error!',
        content: 'Failed to connect to the server.',
        cssClass: 'e-toast-danger',
        icon: 'e-error toast-icons'
      });
      console.error("Fetch error:", error);
    }
  };

  if (!currSections || currSections.length === 0) {
    return (
      <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">
          {currSections ? 'No sections found' : 'Loading...'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      {title && <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {currSections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="shadow-lg p-4 mb-2 bg-white rounded-lg hover:bg-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-800">{section.name}</h2>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            selectHandler(section);
                          }}
                          className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                        >
                          Select
                        </button>
                      </div>
                      <div className="ml-6 mt-2">
                        {section.sub_sections.map((subSection) => (
                          <p key={subSection.url} className="text-gray-600 text-sm my-1">
                            {subSection.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SectionsList;
