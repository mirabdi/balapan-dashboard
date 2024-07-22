import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button } from 'components';
import { BASE_URL } from 'data/config';

function StoreForm({ method = 'POST', store }) {
  const navigate = useNavigate();
  const { showToast, currentColor } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState({
    name: store?.address?.name || '',
    longitude: store?.address?.longitude || '',
    latitude: store?.address?.latitude || ''
  });

  const cancelHandler = () => {
    navigate('/app/stores/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: event.target.name.value,
      cloudshop_id: event.target.cloudshop_id.value,
      address
    };

    try {
      const response = await fetch(`${BASE_URL}/crm/admin-api/stores${store ? `/${store.id}` : ''}`, {
        method: store ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token token', // Replace 'token' with your actual token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось сохранить магазин.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        setIsSubmitting(false);
        return;
      }

      showToast({ title: 'Успех!', content: 'Магазин успешно сохранён.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      navigate('/app/stores/');
    } catch (error) {
      showToast({ title: 'Ошибка!', content: 'Сетевая ошибка или некорректный ответ.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error('Fetch error:', error);
      setIsSubmitting(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl px-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Название</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={store ? store.name : ''}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cloudshop_id" className="block text-gray-700 text-sm font-bold mb-2">Cloudshop ID</label>
        <input
          id="cloudshop_id"
          type="text"
          name="cloudshop_id"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={store ? store.cloudshop_id : ''}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address_name" className="block text-gray-700 text-sm font-bold mb-2">Адрес (Название)</label>
        <input
          id="address_name"
          type="text"
          name="name"
          value={address.name}
          onChange={handleAddressChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="longitude" className="block text-gray-700 text-sm font-bold mb-2">Долгота</label>
        <input
          id="longitude"
          type="text"
          name="longitude"
          value={address.longitude}
          onChange={handleAddressChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="latitude" className="block text-gray-700 text-sm font-bold mb-2">Широта</label>
        <input
          id="latitude"
          type="text"
          name="latitude"
          value={address.latitude}
          onChange={handleAddressChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
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

export default StoreForm;
