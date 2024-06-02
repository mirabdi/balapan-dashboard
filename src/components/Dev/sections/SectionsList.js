import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";



const SectionsList = ({sections, title, selectHandler}) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <div className="overflow-x-auto">
    <div className="py-2 align-middle inline-block min-w-full">
      <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <div className="mb-4">
        {/* Map through sections to create checkboxes */}
        {sections && sections.map((section) => (
          <div key={section.id}  className={(section.included ? "bg-gray-200 "  : "bg-white  ") + "p-4 mb-2 shadow-md rounded-lg hover:bg-gray-300"}>
            <label className="flex items-center text-gray-800 text-md font-semibold mb-2 cursor-pointer" >
              {section.name}
            </label>
            <div className="ml-6">
              {/* Display sub-sections */}
              {section.sub_sections.map((subSection) => (
                <p key={subSection.url} className="text-gray-600 text-sm my-1 transition-colors duration-200">
                  {subSection.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  </div>
  );
};

export default SectionsList;