import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RightModal, Header } from '../../../components';
import { BASE_URL } from "../../../data/config";
import { OrderDetail } from '../../../pages';
import { useStateContext } from '../../../contexts/ContextProvider';

const Orders = ({status='ordered'}) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { rightModal, setRightModal } = useStateContext();
  const [dataManager, setDataManager] = useState(null);

  useEffect(() => {
    const newDataManager = new DataManager({
      url: `${BASE_URL}/crm/admin-api/orders/list`,
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    });
    setDataManager(newDataManager);
  }, []);



  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setRightModal(true);
  };


  const fetchOrders = async () => { 
    try {
      const response = await axios.post(`${BASE_URL}/crm/admin-api/orders/list`, {});
      console.log(response.data); // Debug: Log the response data to ensure it's correct
      setOrders(response.data.result || []); // Set orders to the result array from the response
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${BASE_URL}/crm/admin-api/orders/${orderId}`, {  });
      await fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
  
  const statusToRussian = {
    cart: 'Корзина',
    ordered: 'Оформлен',
    preparing: 'Сборка',
    ready: 'Готов',
    delivering: 'Доставка',
    completed: 'Завершен',
    canceled: 'Отменен',
  };

  return (
    <>
    <Header category="Страница" title="Заказы" />
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Клиент</th>
            <th scope="col" className="py-3 px-6">Магазин</th>
            <th scope="col" className="py-3 px-6">Адрес</th>
            <th scope="col" className="py-3 px-6">Дата</th>
            <th scope="col" className="py-3 px-6">Количество</th>
            <th scope="col" className="py-3 px-6">Сумма</th>
            <th scope="col" className="py-3 px-6">Способ оплаты</th>
            <th scope="col" className="py-3 px-6">Способ доставки</th>
            <th scope="col" className="py-3 px-6">Статус</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-white border-b hover:bg-gray-50" onClick={() => handleRowClick(order)}>
              <td className="py-4 px-6">{order.id}</td>
              <td className="py-4 px-6">{order.client.name}</td>
              <td className="py-4 px-6">{order.store ? order.store.name : 'N/A'}</td> 
              <td className="py-4 px-6">{order.address.name}</td>
              <td className="py-4 px-6">{new Date(order.ordered).toLocaleDateString()}</td>
              <td className="py-4 px-6">{order.quantity}</td>
              <td className="py-4 px-6">{order.sum}</td>
              <td className="py-4 px-6">{order.payment_option}</td>
              <td className="py-4 px-6">{order.delivery_option}</td>
              <td className="py-4 px-6">
                <select 
                  defaultValue={order.status} 
                  onClick={(e) => {e.stopPropagation();}}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, e.target.value)
                  }}
                  className="form-select block w-full mt-1">
                  {Object.entries(statusToRussian).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {rightModal && selectedOrder &&
        <RightModal title={"Заказ №" + selectedOrder.id} afterClose={() => setSelectedOrder(null)}>
           <OrderDetail order={selectedOrder} />
        </RightModal>
        }
    </div>
    </>
  );
};

export default Orders
