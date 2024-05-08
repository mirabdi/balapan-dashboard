import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStateContext } from 'contexts/ContextProvider';


const ImageLoader = ({ images, url }) => {
    const [imageList, setImageList] = useState(images);
    const { token, showToast } = useStateContext();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('new_picture', file);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setImageList(data.response.pictures);
                showToast({ title: 'Успех!', content: 'Изображение успешно загружено.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            } else {
                showToast({ title: 'Ошибка!', content: 'Не удалось загрузить изображение.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
            }
        } catch (error) {
            showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или неверный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
            console.error('Error uploading image:', error);
        }
    };

    const deleteImage = async (image) => {
        console.log('Deleting image:', image)
        const formData = new FormData();
        formData.append('picture_url', image);

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                showToast({ title: 'Успех!', content: 'Изображение успешно удалено.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
                setImageList(data.response.pictures);
            } else {
                showToast({ title: 'Ошибка!', content: 'Не удалось удалить изображение.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
            }
        } catch (error) {
            showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или неверный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
            console.error('Error deleting image:', error);
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(imageList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setImageList(items);
        try{
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ pictures: items })
            });
            if(response.ok){
                const data = await response.json();
                showToast({ title: 'Успех!', content: 'Порядок изображений обновлен.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            }
            else{
                showToast({ title: 'Ошибка!', content: 'Не удалось обновить порядок изображений.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
            }
        }
        catch(error){
            console.error('Error updating image order:', error);
            showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или неверный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }



    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex overflow-x-scroll py-2 items-center bg-white shadow-md rounded-lg p-4"
                        style={{ display: 'flex', overflow: 'auto' }}
                    >
                        {imageList.map((image, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="relative"
                                    >
                                        <button
                                            onClick={() => deleteImage(image)}
                                            className="absolute right-0 top-0 bg-red-500 text-white p-1 rounded-full text-sm"
                                            style={{ zIndex: 10 }}>
                                            &times;
                                        </button>
                                        <img
                                            src={image}
                                            alt={`Uploaded ${index}`}
                                            className="h-32 w-auto rounded-md shadow-sm border border-gray-200 m-2"
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => document.getElementById('file-upload').click()}
            >
                +
            </button>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </DragDropContext>
    );
};

export default ImageLoader;
