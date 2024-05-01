import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button, ProductSelector } from 'components';
import { BASE_URL } from 'data/config';

function ListingForm({ currentListing, parent_assortment, afterAction }) {
  const navigate = useNavigate();
  const { currentColor, showToast, token } = useStateContext();
  const [listing, setListing] = useState(currentListing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancelHandler = () => {
    if(afterAction){
      afterAction();
      return;
    }
    navigate('/app/listings/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(event.target);
      formData.append('product_id', listing.product.id);
      formData.append('parent_id', parent_assortment ? parent_assortment.id : null);
      const response = await fetch(`${BASE_URL}/crm/admin-api/listings${currentListing ? `/${currentListing.id}` : ''}`, {
        method: currentListing ? 'PUT' : 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось сохранить листинг.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        return;
      }

      showToast({ title: 'Успех!', content: 'Листинг успешно сохранен.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      if(afterAction){
        afterAction();
        return;
      }
      navigate('/app/listings/');
    } catch (error) {
      console.log(error);
      showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или неверный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const product = listing ? listing.product : null;
  return (
    <>
      <ProductSelector product={product} onSelect={(data) => setListing(data)}/>
      {listing &&
          <form onSubmit={handleSubmit} className="w-full max-w-xl px-8" encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Наименование</label>
              <input
                id="title"
                type="text"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                defaultValue={listing ? listing.title : ''}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Рисунок</label>
              <input
                type="file"
                id="image"
                name="image"
                className="shadow w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />
              {listing && listing.image_url && <img src={listing.image_url} alt={listing.title} className="mt-2 w-48 h-48 object-cover rounded-lg" />}
            </div>
            <div className="mb-4">
              <label htmlFor="sale_price" className="block text-gray-700 text-sm font-bold mb-2">Цена продажи</label>
              <input
                id="sale_price"
                type="number"
                name="sale_price"
                defaultValue={listing ? listing.sale_price : 0}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bonus" className="block text-gray-700 text-sm font-bold mb-2">Бонусы</label>
              <input
                id="bonus"
                type="number"
                name="bonus"
                defaultValue={listing ? listing.bonus : 0}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="discount_percent" className="block text-gray-700 text-sm font-bold mb-2">Скидка (%)</label>
              <input
                id="discount_percent"
                type="number"
                name="discount_percent"
                defaultValue={listing ? listing.discount_percent : 0}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                step="0.01"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={listing ? listing.description : ''}
              />
            </div>
            <div className="float-right">
              <button type="button" onClick={cancelHandler} disabled={isSubmitting} className="mr-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Отмена
              </button>
              <Button
                color="white"
                bgColor={currentColor}
                text={isSubmitting ? 'Отправка...' : 'Сохранить'}
                type="submit"
                borderRadius="10px"
                disabled={isSubmitting}
                className="m-2"
              />
            </div>
          </form>
      }
    </>
  );
}

export default ListingForm;
