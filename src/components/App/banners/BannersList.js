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
  for (let i = 0; i < result.length; i++) {
    result[i].priority = i;
  }
  return result;
};

function BannersList({ banners, title, selectHandler }) {
  const [currBanners, setCurrBanners] = useState(banners);
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  console.log("BannersList", currBanners);

  useEffect(() => {
    setCurrBanners(banners);
  }, [banners]);
  const archiveBanner = async (id, is_archived) => {
    const confirmArchive = window.confirm("Вы уверены, что хотите архивировать этот баннер?");
    if (confirmArchive) {
      try {
        const url = `${BASE_URL}/crm/admin-api/banners`;
        const token = "token"; // Ensure you have the correct token

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
          showToast({ title: 'Успех!', content: 'Баннер успешно архивирован.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/app/banners/archived" : "/app/banners/");
        } else {
          const errorData = await response.json();
          showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось архивировать баннер.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showToast({ title: 'Ошибка!', content: 'Не удалось связаться с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const newBanners = reorder(
      currBanners,
      result.source.index,
      result.destination.index
    );
    setCurrBanners(newBanners);
    try {
      const token = "token"; // Ensure you have the correct token
      const response = await fetch(BASE_URL + "/crm/admin-api/banners/update-priority", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ banners: newBanners }), // Send only the IDs in their new order
      });

      if (response.ok) {
        showToast({ title: 'Успех!', content: 'Порядок баннеров обновлен.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      } else {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось обновить порядок баннеров.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    } catch (error) {
      showToast({ title: 'Ошибка!', content: 'Не удалось связаться с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error("Fetch error:", error);
      setCurrBanners(currBanners);
    }
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">
          {banners ? 'Баннеры не найдены' : 'Загрузка...'}
        </p>
      </div>
    );
  }
  

  return (
    <div className="bg-white py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="banners">
          {(provided, snapshot) => (
            <ul className="max-w-4xl mx-auto" {...provided.droppableProps} ref={provided.innerRef}>
              {currBanners.map((banner, index) => (
                <Draggable key={banner.id} draggableId={banner.title} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-200 rounded-lg overflow-hidden shadow-lg my-4 flex relative"
                    >
                      <div onClick={() => selectHandler(banner)} className="flex items-center hover:bg-gray-100 w-full text-decoration-none">
                        <MyImage src={banner.image_url} alt={banner.title} className="flex-none w-48 h-48 object-cover rounded-l-lg" />
                        <div className="p-4 flex flex-col justify-between leading-normal">
                          <h2 className="font-bold text-xl mb-2 text-gray-900">{banner.title}</h2>
                          <p className="mb-2 text-gray-900">{banner.description}</p>
                          <time className="text-sm text-gray-600">{banner.date}</time>
                        </div>
                      </div>
                      {/* Buttons container */}
                      <div className="absolute top-0 right-0 m-4">
                        {/* Archive Button */}
                        <button
                          onClick={() => archiveBanner(banner.id, !banner.is_archived)}
                          className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                        >
                          {banner.is_archived ? "Восстановить" : "В архив"}
                        </button>
                        {/* Edit Button */}
                        <Link
                          to={`/app/banners/${banner.id}/edit/`}
                          className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                        >
                          Изменить
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

export default BannersList;
