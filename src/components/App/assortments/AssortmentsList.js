import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { MyImage } from "components";

const reorder = (list, startIndex, endIndex) => {
  if (startIndex === endIndex) {
    return list;
  }
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

function AssortmentsList({ assortments, title, selectHandler }) {
  const [currAssortments, setCurrAssortments] = useState(assortments);
  useEffect(() => {
    setCurrAssortments(assortments);
  }, [assortments]);
  const navigate = useNavigate();
  const { showToast, token } = useStateContext();
  const archiveAssortment = async (id, is_archived) => {
    const confirmArchive = window.confirm("Вы уверены, что хотите архивировать этот ассортимент?");
    if (confirmArchive) {
      try {
        const url = `${BASE_URL}/crm/admin-api/assortments`;
        const formData = new FormData();
        formData.append("id", id);
        formData.append("is_archived", is_archived);
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          showToast({ title: 'Успех!', content: 'Ассортимент успешно архивирован.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/app/assortments/archived" : "/app/assortments/");
        } else {
          const errorData = await response.json();
          showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось архивировать ассортимент.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showToast({ title: 'Ошибка!', content: 'Не удалось связаться с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    } 

    const newAssortments = reorder(
      currAssortments,
      result.source.index,
      result.destination.index
    );
    setCurrAssortments(newAssortments);
    try {
      const token = "token"; 
      const response = await fetch(BASE_URL + "/crm/admin-api/assortments/update-priority", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ assortments: newAssortments }), 
      });

      if (response.ok) {
        showToast({ title: 'Успех!', content: 'Порядок ассортиментов обновлен.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      } else {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось обновить порядок ассортиментов.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    } catch (error) {
      showToast({ title: 'Ошибка!', content: 'Не удалось связаться с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error("Fetch error:", error);
      setCurrAssortments(currAssortments);
    }
  };

  if (currAssortments.length === 0) {
    return <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">Ассортиментов не найдено</p>
    </div>
  }

  return (
    <div className="bg-white py-8">
      {title && <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="assortments">
              {(provided) => (
                <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Описание</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Создан</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Рисунок</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Иконка</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currAssortments.map((assortment, index) => (
                        <Draggable key={assortment.id} draggableId={assortment.id.toString()} index={index}>
                          {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="hover:bg-gray-100 hover:cursor-pointer" onClick={() => selectHandler(assortment)}>
                              <td className="px-6 py-4 text-md text-gray-500">{assortment.title}</td>
                              <td className="px-6 py-4 text-md text-gray-500">{assortment.description.slice(0, 100)}...</td>
                              <td className="px-6 py-4 text-md text-gray-500">{new Date(assortment.created).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <MyImage src={assortment.image_url} alt={assortment.title} height="h-32" width="w-32" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <MyImage src={assortment.icon_url} alt={assortment.title} height="h-32" width="w-32" />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    archiveAssortment(assortment.id, !assortment.is_archived);
                                  }}
                                  className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                                >
                                  {assortment.is_archived ? "Восстановить" : "Архивировать"}
                                </button>
                                <Link
                                  onClick={(event) => event.stopPropagation()}
                                  to={`/app/assortments/${assortment.id}/edit`}
                                  className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                                >
                                  Редактировать
                                </Link>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  </table>
                </div>
              )}
            </Droppable>
          </DragDropContext>
    </div>
  );
}

export default AssortmentsList;
