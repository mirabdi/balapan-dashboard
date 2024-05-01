import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button } from 'components';
import { BASE_URL } from 'data/config';
import { AssortmentCard } from 'components';

function AssortmentForm({assortment, parent_assortment, afterAction}) {
  const navigate = useNavigate();
  const { showToast, currentColor, token } = useStateContext();
  const [isCatalog, setIsCatalog] = useState(assortment ? assortment.is_catalog : false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isCatalog && parent_assortment) {
    setIsCatalog(true);
  }

  if (!assortment && !isEditing) {
    setIsEditing(true);
  }

  const cancelHandler = () => {
    if (assortment) {
      setIsEditing(false);
      return;
    }
    navigate('/app/assortments/');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('id', assortment ? assortment.id : '');
    formData.append('parent_id', parent_assortment ? parent_assortment.id : null);
    setIsSubmitting(true);

    try {
      const url = `${BASE_URL}/crm/admin-api/assortments`;
      const response = await fetch(url, {
        method: assortment ? 'PUT' : 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось сохранить ассортимент.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        setIsSubmitting(false);
        return;
      }

      showToast({ title: 'Успех!', content: 'Ассортимент успешно сохранен.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      setIsSubmitting(false);
      if (afterAction) {
        afterAction();
        return;
      }
      if (parent_assortment) {
        navigate(`/app/assortments/${parent_assortment.id}/edit`);
      } else {
        navigate('/app/assortments/');
      }
    } catch (error) {
      showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или недействительный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error('Fetch error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isEditing ?
      <AssortmentCard assortment={assortment} onEdit={() => setIsEditing(true)} />
      :
      <form onSubmit={handleSubmit} className="w-full max-w-xl px-8" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Название</label>
          <input
            id="title"
            type="text"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            defaultValue={assortment ? assortment.title : ''}
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
          {(assortment && assortment.image_url) && <img src={assortment.image_url} alt="Изображение ассортимента" className="w-24 h-24 object-cover rounded-md" />}
        </div>
        <div className='mb-4'>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={assortment ? assortment.description : ''}
          />
          <div className='mb-4 flex items-center'>
              <label htmlFor="catalog" className="block text-gray-700 text-sm font-bold mb-2 mr-2">Каталог</label>
              <input type="checkbox" id="catalog" name="is_catalog" checked={isCatalog} onChange={() => setIsCatalog((prevIsCatalog)=>!prevIsCatalog)} />

          </div>
          {isCatalog &&
            <div className='mb-4 flex items-center'>
                <label htmlFor="catalog_icon" className="block text-gray-700 text-sm font-bold mb-2 mr-2">Значок каталога</label>
                <input
                type="file"
                id="catalog_icon"
                name="catalog_icon"
                className="shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
                />
                {assortment && assortment.catalog_icon && <img src={assortment.catalog_icon} alt="Значок каталога ассортимента" className="w-24 h-24 object-cover rounded-md" />}
            </div>
          }
        </div>
        {/* buttons VVV */}
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
      }
    </>
  );
}

export default AssortmentForm;
