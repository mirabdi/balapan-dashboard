import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { gridOrderStatus } from "data/utils";
import { MdRefresh } from 'react-icons/md';

const OrdersList = ({orders, title, selectHandler}) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const statusToRussian = {
    'cart': 'Корзина',
    'ordered': 'Оформлен',
    'preparing': 'Сборка',
    'ready': 'Готов',
    'delivering': 'Доставка',
    'completed': 'Завершен',
    'canceled': 'Отменен',
  }

  if(!orders || orders.length === 0) {
    return <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">{orders  ? 'Заказов не найдено' :  'Загрузка...'}</p>
    </div>
  }
  return (
    <div className="overflow-x-auto">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Магазин</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Адрес</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Количество</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Способ оплаты</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Способ доставки</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} onClick={()=>selectHandler(order)} className="hover:bg-gray-100 cursor-pointer"> 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.client ? order.client.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statusToRussian[order.status]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.store ? order.store.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.address ? order.address.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.ordered)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      {order.total ? order.total.sum : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.total ? order.total.quantity : 'N/A'}                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      {order.payment_option}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      {order.delivery_option}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  </div>
  );
};

export default OrdersList;