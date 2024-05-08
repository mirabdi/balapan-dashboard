import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button } from 'components';
import { BASE_URL } from 'data/config';


function PostForm({ method = 'POST', post }) {
  const navigate = useNavigate();
  const { showToast, currentColor } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancelHandler = () => {
    navigate('/app/posts/');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/crm/admin-api/posts${post ? `/${post.id}` : ''}`, {
        method: post ? 'PUT' : 'POST',
        headers: {
          Authorization: 'Token token', // Replace 'token' with your actual token
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось сохранить пост.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        setIsSubmitting(false);
        return;
      }

      showToast({ title: 'Успех!', content: 'Пост успешно сохранён.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      navigate('/app/posts/');
    } catch (error) {
      showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или некорректный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error('Fetch error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl px-8" encType="multipart/form-data">
       <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Название</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={post ? post.title : ''}
        />
      </div>
      <div className='mb-4 flex items-center'>
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2 mr-2">Изображение</label>
        <input
          type="file"
          id="image"
          name="image"
          className="shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          accept="image/*"
        />
        {post && <img src={post.image_url} alt="Post" className="w-24 h-24 object-cover rounded-md" />}
      </div>
      <div className='mb-4'>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={post ? post.description : ''}
        />
      </div>
      {/*  buttons VVV */}
      <div className="float-right">
        <button type="button" onClick={cancelHandler} disabled={isSubmitting} className='mr-3'>
          Отмена
        </button>
        <Button
          color="white"
          bgColor={currentColor}
          disabled={isSubmitting}
          text={isSubmitting ? 'Отправка...' : 'Сохранить'}
          type="submit"
          borderRadius="10px"
          className="m-2"
        />
      </div>
      
    </form>
  );
}

export default PostForm;
