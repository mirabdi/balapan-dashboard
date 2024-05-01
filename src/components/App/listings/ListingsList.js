import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { MyImage } from "components";

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


function ListingsList({ listings, title, selectHandler }) {
  const [currListings, setCurrListings] = useState(listings);
  useEffect(() => {
    setCurrListings(listings);
  }, [listings]);
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveListing = async (id, is_archived) => {
    let confirmMessage = is_archived ? "Вы уверены, что хотите архивировать этот листинг?" :  "Вы уверены, что хотите восстановить этот листинг?" ;
    const confirmArchive = window.confirm(confirmMessage);
    if (confirmArchive) {
      try {
        // Create the URL for the request
        const url = `${BASE_URL}/crm/admin-api/listings`; // Adjust URL path as needed
        const token = "token";  // Ensure you have the correct token
  
        // Create FormData object and append necessary fields
        const formData = new FormData();
        formData.append("id", id);
        formData.append("is_archived", is_archived);
  
        // Make the fetch request to update the listing
        const response = await fetch(url, {
          method: "PUT",  // Since we are updating part of the resource, PUT is appropriate
          headers: {
            Authorization: `Token ${token}`,  // Set authorization token
          },
          body: formData,
        });
  
        // Check the response status
        if (response.ok) {
          showToast({
            title: 'Успех!',
            content: 'листинг успешно архивировано.',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons'
          });
          navigate(is_archived ? "/app/listings/archived" : "/app/listings/");
        } else {
          const errorData = await response.json();
          showToast({
            title: 'Ошибка!',
            content: errorData.message || 'Не удалось архивировать листинг.',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
        }
        } catch (error) {
          console.error("Fetch error:", error);
          showToast({
            title: 'Ошибка!',
            content: 'Не удалось связаться с сервером.',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
        }
    }
  };

  const onDragEnd = async (result) => { 
      if (!result.destination) {
        return;
      }
  
      const newListings = reorder(
        currListings,
        result.source.index,
        result.destination.index
      );
      setCurrListings(newListings);
      try {
        const token = "token";  // Ensure you have the correct token
        const response = await fetch(BASE_URL + "/crm/admin-api/listings/update-priority", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ listings: newListings }),  // Send only the IDs in their new order
        });
    
        if (response.ok) {
          showToast({
            title: 'Успех!',
            content: 'Порядок листингов обновлен.',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons'
          });
        } else {
          const errorData = await response.json();
          showToast({
            title: 'Ошибка!',
            content: errorData.message || 'Не удалось обновить порядок листингов.',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
        }
        } catch (error) {
          showToast({
            title: 'Ошибка!',
            content: 'Не удалось связаться с сервером.',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
          console.error("Fetch error:", error);
          setCurrListings(currListings); // Assuming the function setCurrListings is part of handling the state.
        }        
  };

  if(currListings.length === 0) {
    return <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">Листингов не найден</p>
    </div>
  }
  return (
    
    <div className="bg-white py-8">
      {title && <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>}
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="listings">
          {(provided) => (
             <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
             <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
               <thead className="bg-gray-50">
                 <tr>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Описание</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Создан</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Рисунок</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                {currListings.map((listing, index) => (
                  <Draggable to={`/app/listings/${listing.id}`} onClick={() => selectHandler(listing)} key={listing.id} draggableId={listing.id.toString()} index={index}>
                  {(provided) => (
                    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="hover:bg-gray-100 hover:cursor-pointer" onClick={() => selectHandler(listing)}> 
                      <td className="max-w-32 px-6 py-4  text-md  text-gray-500 ">{listing.title}</td>
                      <td className="max-w-32  px-6 py-4 text-md  text-gray-500">{listing.description.slice(0, 100)}...</td>
                      <td className=" px-6 py-4 text-md  text-gray-500">{new Date(listing.created).toLocaleDateString('ru-RU', {year: 'numeric',month: 'long',day: 'numeric'})}</td>
                      <td className=" px-6 py-4">
                        <MyImage src={listing.image_url} alt={listing.title}  height="h-32" width="w-32 "/>
                      </td>
                      <td className=" px-6 py-4">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            archiveListing(listing.id, !listing.is_archived)}}
                          className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                        >
                          {listing.is_archived ? "Восстановить" : "В архив"}
                        </button>
                        <Link
                          onClick={(event) => event.stopPropagation()}
                          to={`/app/listings/${listing.id}/edit/`}
                          className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                        >
                          Edit
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

export default ListingsList;
