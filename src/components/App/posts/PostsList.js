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

function PostsList({ posts, title, selectHandler }) {
  const [currPosts, setCurrPosts] = useState(posts);
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archivePost = async (id, is_archived) => {
    let confirmMessage = is_archived ? "Вы уверены, что хотите архивировать этот пост?" : "Вы уверены, что хотите восстановить этот пост?" ;
    const confirmArchive = window.confirm(confirmMessage);
    if (confirmArchive) {
      try {
        const url = `${BASE_URL}/crm/admin-api/posts`; // Adjust URL path as needed
        const token = "token";  // Ensure you have the correct token
  
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
          showToast({ title: 'Успех!', content: 'Пост успешно архивирован.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/app/posts/archived" : "/app/posts/");
        } else {
          const errorData = await response.json();
          showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось архивировать пост.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showToast({ title: 'Ошибка!', content: 'Сбой при общении с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
  
    const newPosts = reorder(
      currPosts,
      result.source.index,
      result.destination.index
    );
    setCurrPosts(newPosts);
    try {
      const token = "token";  // Ensure you have the correct token
      const response = await fetch(BASE_URL + "/crm/admin-api/posts/update-priority", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ posts: newPosts }),
      });
    
      if (response.ok) {
        showToast({ title: 'Успех!', content: 'Порядок постов обновлён.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      } else {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось обновить порядок постов.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    } catch (error) {
        showToast({ title: 'Ошибка!', content: 'Сбой при общении с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        console.error("Fetch error:", error);
        setCurrPosts(currPosts);
    }
  };

  return (
    <div className="bg-white py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="posts">
          {(provided, snapshot) => (
            <ul className="max-w-4xl mx-auto" {...provided.droppableProps} ref={provided.innerRef}>
              {currPosts.map((post, index) => (
                <Draggable key={post.id} draggableId={post.title} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-200 rounded-lg overflow-hidden shadow-lg my-4 flex relative"
                    >
                      <div onClick={()=>selectHandler(post)} className="flex items-center hover:bg-gray-100 w-full text-decoration-none">
                        <img src={post.image_url} alt={post.title} className="flex-none w-48 h-48 object-cover rounded-l-lg" />
                        <div className="p-4 flex flex-col justify-between leading-normal">
                          <h2 className="font-bold text-xl mb-2 text-gray-900">{post.title}</h2>
                          <p className="mb-2 text-gray-900">{post.description}</p>
                          <time className="text-sm text-gray-600">{post.date}</time>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 m-4">
                        <button
                          onClick={() => archivePost(post.id, !post.is_archived)}
                          className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                        >
                          {post.is_archived ? "Восстановить" : "В архив"}
                        </button>
                        <Link
                          to={`/app/posts/${post.id}/edit/`}
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

export default PostsList;
