import React, { useState } from 'react';
import { useStateContext } from 'contexts/ContextProvider';
import axios from 'axios';
import { BASE_URL } from 'data/config';
import {
  BsCart4,
  BsBoxSeam,
  BsTools,
  BsTruck,
  BsCheckCircle,
  BsXCircle,
  BsTelephone, BsCash,
} from 'react-icons/bs'; 


const OrderItem = ({order, afterStatusUpdate}) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Заказ №{order.id}</h2>
            <p>Клиент: {order.client?.name ?? 'N/A'}</p>
            <p>Магазин: {order.store?.name ?? 'N/A'}</p>
            <p>Адрес: {order.address?.name ?? 'N/A'}</p>
            <p>Время заказа: {formatDate(order.ordered)}</p>

            {/* Order payment and contact info */}
            <div className="my-4">
              <div className="flex items-center justify-between p-4">
                <BsCash className="text-blue-500" />
                <span className="text-sm">Способ оплаты: {order.details?.payment_option ?? 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between p-4">
                <BsTelephone className="text-blue-500" />
                <span className="text-sm">Контактный телефон: {order.client?.phone ?? 'N/A'}</span>
              </div>
            </div>

            {/* Status indicator */}
            <StatusIndicator 
                defaultStatus={order.status} 
                orderId={order.id}
                afterStatusUpdate={afterStatusUpdate}
            />

            {/* List of items */}
            <ul className="divide-y divide-gray-200">
                {order.items_list.map((item, index) => (
                    <li key={index} className="py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={item.listing.image_url} alt={item.listing.title} className="h-12 w-12 object-cover mr-4" />
                            <div>
                                <p className="font-medium">{item.listing.title}</p>
                                <p className="text-sm text-gray-600">Цена: {item.total.price} сом</p>
                            </div>
                        </div>
                        <span>Количество: {item.total.quantity} шт</span>
                    </li>
                ))}
            </ul>

            {/* Totals summary */}
            <div className="mt-4 p-4 border-t border-gray-200">
                <div className="flex justify-between">
                    <span>Сумма заказа</span>
                    <span>{order.total.sum} сом</span>
                </div>
                <div className="flex justify-between">
                  <span>Скидка</span>
                  <span>{order.total.discount_sum} сом</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>{order.total.delivery_fee} сом</span>
                </div>
                <div className="flex justify-between">
                  <span>Итого</span>
                  <span>{order.total.sum - order.total.discount_sum + order.total.delivery_fee} сом</span>
                </div>
            </div>
          </div>
        );
};

export default OrderItem;


const StatusIndicator = ({ defaultStatus, orderId, afterStatusUpdate}) => {
  const { showToast } = useStateContext();
  const [currentStatus, setCurrentStatus] = useState(defaultStatus);

  const updateOrderStatus = async (status) => {
    const confirm = window.confirm(`Вы уверены, что хотите обновить статус заказа на ${status}?`);
    if (!confirm) return;
    try {
      await axios.put(`${BASE_URL}/crm/admin-api/orders/${orderId}`, {status});
      showToast({ title: 'Успех!', content: 'Статус успешно обновлен!', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      setCurrentStatus(status);
      if(afterStatusUpdate) afterStatusUpdate(orderId, status);
    } catch (error) {
      console.error('Не удалось обновить статус заказа:', error);
    }
};
  const statusToRussian = {
    cart: { label: 'Корзина', Icon: BsCart4 },
    ordered: { label: 'Оформлен', Icon: BsBoxSeam },
    preparing: { label: 'Сборка', Icon: BsTools },
    ready: { label: 'Готов', Icon: BsCheckCircle },
    delivering: { label: 'Доставка', Icon: BsTruck },
    completed: { label: 'Завершен', Icon: BsCheckCircle },
    canceled: { label: 'Отменен', Icon: BsXCircle },
  };

  const statusOrder = Object.keys(statusToRussian);

  const getStatusClasses = (status) => {
    const isActive = statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);
    return `flex items-center justify-center px-4 py-2 rounded-full transition-colors 
    ${isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
    space-x-2`;
  };

  return (
    <div className="flex space-x-2 justify-center text-sm">
      {statusOrder.map((status) => {
        const { label, Icon } = statusToRussian[status];
        return (
          <button
            onClick={() => updateOrderStatus(status)}
            className={`${getStatusClasses(status)} flex flex-col items-center p-2`} // Adjusted for a vertical layout with padding
          >
            <Icon className="text-lg w-6 h-6 mb-1" /> {/* Icon size adjusted with margin-bottom */}
            <span className="font-medium text-xs">{label}</span> {/* Label styling adjusted */}
          </button>
        );
      })}
    </div>
  );
  
};
