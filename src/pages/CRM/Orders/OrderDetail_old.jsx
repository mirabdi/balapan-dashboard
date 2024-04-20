import React from 'react';
import { Button } from '../../../components';


const OrderDetail = ({ order }) => {
  // Helper function to format the date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const printOrder = () => {
    const content = document.getElementById('orderDetailContent').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Печать заказа</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg" id='orderDetailContent'>
      
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Заказ #{order.id}</h2>
        <button onClick={printOrder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Печать
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          {/* right column */}
          <p><strong>Статус:</strong> {order.status}</p>
          <p><strong>Активный:</strong> {order.active ? 'Да' : 'Нет'}</p>
          <p><strong>Контактное Имя:</strong> {order.details.contact_name}</p>
          <p><strong>Контактный Телефон:</strong> {order.details.contact_phone}</p>
          <p><strong>Дата Доставки:</strong> {formatDate(order.details.delivery_date)}</p>
          <p><strong>Комментарий:</strong> {order.details.comment}</p>
          <p><strong>Создан:</strong> {formatDate(order.created)}</p>
          
        </div>
        <div>
          {/* left column */}
          <p><strong>Процент Скидки:</strong> {order.total.discount_percent}%</p>
          <p><strong>Общее Количество:</strong> {order.total.quantity}</p>
          <p><strong>Итого Сумма:</strong> {order.total.sum}</p>
          <p><strong>Стоимость Доставки:</strong> {order.total.delivery_fee}</p>
          
        </div>
      </div>


      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Оплата</h3>
        <table className="w-full text-left mt-2">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Товар
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Количество
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Цена
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Субтотал
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items_list.map((item) => (
              <tr key={item.listing_id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img alt="Товар" src={item.listing.image_url} className="mx-auto object-cover rounded-lg h-10 w-10" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.listing.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.total.quantity}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.total.price}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {item.total.sub}
                </td>
              </tr>
            ))}
         
         </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
