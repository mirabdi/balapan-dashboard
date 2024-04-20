import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  for (let i = 0; i < result.length; i++) {
    result[i].priority = i;
  }
  return result;
};


function ListingsList({ listings, title, selectHandler }) {
  const [currListings, setCurrListings] = useState(listings);
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveListing = async (id, is_archived) => {
    const confirmArchive = window.confirm("Are you sure you want to archive this listing?");
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
          showToast({ title: 'Success!', content: 'Listing has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/app/listings/archived" : "/app/listings/");  // Redirect based on the archive status
        } else {
          // Throw an error if the server responded with a non-2xx status
          const errorData = await response.json();
          showToast({ title: 'Error!', content: errorData.message || 'Could not archive listing.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        // Handle any errors that occurred during fetch
        console.error("Fetch error:", error);
        showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
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
          // Only update state if the backend has successfully processed the request
          showToast({ title: 'Success!', content: 'Listing order has been updated.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
        } else {
          // If the server responds with an error, inform the user and do not update local state
          const errorData = await response.json();
          showToast({ title: 'Error!', content: errorData.message || 'Failed to update listing order.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        // Handle any errors that occurred during fetch
        showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        console.error("Fetch error:", error);
        setCurrListings(currListings);
      }
      

  };


  return (
    
    <div className="bg-white py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
      
      <Droppable droppableId="listings">
          {(provided, snapshot) => (
            <ul 
            className="max-w-4xl mx-auto"
            {...provided.droppableProps} 
            ref={provided.innerRef}
            >
            {currListings.map((listing, index) => (
              <Draggable key={listing.id} draggableId={listing.title} index={index}>
              {(provided, snapshot) => (
                <li
                ref={provided.innerRef}
                key={listing.id}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-lg my-4 flex relative"
              >
                <div to={`/app/listings/${listing.id}`} onClick={()=>selectHandler(listing)} className="flex items-center hover:bg-gray-100 w-full text-decoration-none">
                  <img src={listing.image_url} alt={listing.title} className="flex-none w-48 h-48 object-cover rounded-l-lg" />
                  <div className="p-4 flex flex-col justify-between leading-normal">
                    <h2 className="font-bold text-xl mb-2 text-gray-900">{listing.title}</h2>
                    <p className="mb-2 text-gray-900">{listing.description}</p>
                    <time className="text-sm text-gray-600">{listing.date}</time>
                  </div>
                </div>
                {/* Buttons container */}
                <div className="absolute top-0 right-0 m-4">
                  {/* Archive Button */}
                  <button
                    onClick={() => archiveListing(listing.id, !listing.is_archived)}
                    className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                  >
                    {listing.is_archived ? "Восстановить" : "В архив"}
                  </button>
                  {/* Edit Button */}
                  <Link
                    to={`/app/listings/${listing.id}/edit/`}
                    className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                  >
                    Edit
                  </Link>
                </div>
              </li>
              )}
              </Draggable>
            ))}
            {provided.placeholder}
            </ul>
          )}
          
        </Droppable>
    </DragDropContext>

    </div>
  );
}

export default ListingsList;
