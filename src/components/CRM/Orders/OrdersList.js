import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { gridOrderStatus } from "data/utils";
import { MdRefresh } from 'react-icons/md';

const OrdersList = ({orders, title, selectHandler}) => {
  // const navigate = useNavigate();
  // const { token, showToast } = useStateContext();
  // const updateStatus = async (id) => {
  //   try{
  //     const response = await fetch(`${BASE_URL}/money/admin-api/opay/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //       body: JSON.stringify({ status: 1 }),
  //     });
  //     if (!response.ok) {
  //       const data = await response.json();
  //       showToast({
  //         title: "Error!",
  //         content: data.detail,
  //         cssClass: "e-toast-danger",
  //         icon: "e-error toast-icons",
  //       });
  //       return;
  //     }
  //     const data = await response.json();
  //     if(!response.ok){
  //       showToast({
  //         title: "Error!",
  //         content: "Failed to update payment.",
  //         cssClass: "e-toast-danger",
  //         icon: "e-error toast-icons",
  //       });
  //       return;
  //     }
  //     if (data.status === 0) {
  //       showToast({
  //         title: "Success!",
  //         content: "Payment updated successfully.",
  //         cssClass: "e-toast-success",
  //         icon: "e-success toast-icons",
  //       });
  //     }
  //     navigate('/pos/opay/active');
  //   } catch (error) {
  //     showToast({
  //       title: "Error!",
  //       content: "Failed to update payment.",
  //       cssClass: "e-toast-danger",
  //       icon: "e-error toast-icons",
  //     });
  //   }

  // };
  console.log(title);
  const formatDate = (date) => new Date(date).toLocaleDateString();
  if(!orders || orders.length === 0) {
    return <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <p className="text-center text-gray-400 text-lg font-semibold">{orders  ? 'Ассортиментов не найдено' :  'Загрузка...'}</p>
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
                    {order.status}
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