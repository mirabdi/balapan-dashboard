import React, { useState } from 'react';
import { Header, Button } from '../../../components';
import { BASE_URL } from '../../../data/config';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

const AddNotification = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [trigger, setTrigger] = useState('');
  const [isSms, setIsSms] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [scheduledTime, setScheduledTime] = useState('');

  const { currentColor } = useStateContext();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: notificationTitle,
      content: notificationContent,
      trigger: trigger,
      is_sms: isSms,
      is_active: isActive,
      ...(trigger === 'scheduled' && { scheduled_date: scheduledTime }), // Conditionally add scheduled_date
    };

    fetch(`${BASE_URL}/crm/admin-api/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
      const newNotificationId = data.response.id;
      navigate(`/crm/notifications/${newNotificationId}`);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleTitleChange = (event) => {
    setNotificationTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNotificationContent(event.target.value);
  };

  return (
    <>
      <Header category="Страница" title="Добавить Уведомление" />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Добавить Новое Уведомление</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="notificationTitle" className="block text-sm font-medium text-gray-700">Наименование</label>
            <input 
              type="text" 
              id="notificationTitle" 
              name="notificationTitle" 
              value={notificationTitle} 
              onChange={handleTitleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-current"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notificationContent" className="block text-sm font-medium text-gray-700">Содержание</label>
            <textarea 
              id="notificationContent" 
              name="notificationContent" 
              value={notificationContent} 
              onChange={handleContentChange} 
              rows="10" 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-current"
              required
            ></textarea>
          </div>
          {/* Trigger field */}
          <div className="mb-4">
            <label htmlFor="trigger" className="block text-sm font-medium text-gray-700">Триггер</label>
            <select
              id="trigger"
              name="trigger"
              value={trigger}
              onChange={(event) => setTrigger(event.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Выберите триггер</option>
              <option value="sale">Продажа</option>
              <option value="bonus">Бонус</option>
              <option value="order">Заказ</option>
              <option value="birthday">День Рождения</option>
              <option value="scheduled">Запланированный</option>
            </select>
          </div>

          {/* Boolean fields */}
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="is_sms" 
              checked={isSms} 
              onChange={() => setIsSms(!isSms)} 
              className="mr-2"
            />
            <label htmlFor="is_sms" className="text-sm font-medium text-gray-700">Отправить SMS, если клиент не использует приложение.</label>
          </div>
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="is_active" 
              checked={isActive} 
              onChange={() => setIsActive(!isActive)} 
              className="mr-2"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Активный</label>
          </div>

          {/* Conditional scheduled_date field */}
          {trigger === 'scheduled' && (
            <div className="mb-4">
              <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">Дата запланированного события</label>
              <input 
                type="datetime-local" 
                id="scheduledTime" 
                name="scheduledTime" 
                value={scheduledTime} 
                onChange={(event) => setScheduledTime(event.target.value)} 
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required={trigger === 'scheduled'}
              />
            </div>
          )}

          <Button
            color="white"
            bgColor={currentColor}
            text="Отправить"
            type="submit"
            borderRadius="10px"
            className="m-2"
          />
          <Link to="/crm/notifications/">
            <Button
              color="white"
              bgColor="gray"
              text="Отмена"
              borderRadius="10px"
            />
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddNotification;
