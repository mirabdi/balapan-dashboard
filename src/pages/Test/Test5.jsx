import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { FaPrint } from 'react-icons/fa';


const Shifts = () => {
    const [selectedShift, setSelectedShift] = useState('3019');
  
    const shifts = [
      { id: '3019', date: '6 июня', duration: '1 д 6 ч 21 мин', positive: 73824.31, negative: 1495.50 },
      { id: '3014', date: '5 июня', duration: '12 ч 8 мин', positive: 107224.62, negative: 385.00 },
      { id: '3008', date: '4 июня', duration: '11 ч 58 мин', positive: 112331.77, negative: 0 },
      { id: '3002', date: '3 июня', duration: '11 ч 57 мин', positive: 87421.09, negative: 998.00 },
      { id: '2997', date: '2 июня', duration: '11 ч 56 мин', positive: 71445.72, negative: 779.00 },
      { id: '2993', date: '1 июня', duration: '12 ч 7 мин', positive: 163524.39, negative: 4270.10 },
    ];
  
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/4 bg-white overflow-y-auto border-r border-gray-200">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedShift === shift.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedShift(shift.id)}
            >
              <div className="flex items-center text-gray-600 mb-1">
               
                {shift.date}
              </div>
              <div className="font-semibold text-gray-800">Смена #{shift.id}</div>
              <div className="text-sm text-gray-500">{shift.duration}</div>
              <div className="flex justify-between mt-2">
                <span className="text-green-600">+{shift.positive.toFixed(2)}</span>
                <span className="text-red-600">-{shift.negative.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-3/4 overflow-y-auto p-6">
          <SalesDashboard shiftId={selectedShift} />
        </div>
      </div>
    );
  };


const SalesDashboard  =  ({ shiftId }) => {
  return (
    <div className="font-sans max-w-3xl mx-auto text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Смена #{shiftId}</h1>
        <p className="text-sm text-gray-600">dina • 6 июня 08:51 — 7 июня 15:13 (1 д 6 ч 21 мин)</p>
      </div>
      <div className="flex mb-8">
        <div className="w-1/2 pr-2">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Продажи</h2>
            <div className="text-4xl font-bold mb-4 text-gray-800">57</div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Наличные</span>
                <span>73,824.31com</span>
              </div>
              <div className="flex justify-between">
                <span>Безналичные</span>
                <span>0.00com</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Сумма продаж</span>
                <span>73,824.31com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Возвраты</h2>
            <div className="text-4xl font-bold mb-4 text-gray-800">3</div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Наличные</span>
                <span>1,495.50com</span>
              </div>
              <div className="flex justify-between">
                <span>Безналичные</span>
                <span>0.00com</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Сумма возвратов продаж</span>
                <span>1,495.50com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-300 rounded p-4 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Касса</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Сумма на начало смены</span>
            <span>6,234.62com</span>
          </div>
          <div className="flex justify-between">
            <span>Сумма всех взносов</span>
            <span>73,824.31com</span>
          </div>
          <div className="flex justify-between">
            <span>Сумма всех выносов</span>
            <span>80,058.93com</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Сумма на конец смены</span>
            <span>4,255.43com</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SaleItem
          id="145224"
          amount="1,138.80"
          date="6 июня 20:26"
          user="dina"
          store="Балапан Ош №1"
          customer="Маматсайт кызы Бурма"
          comment="бермет"
          itemCount={2}
          paymentDetails={{
            number: "151115",
            client: "Маматсайт кызы Бурма",
            date: "6 июня 20:26",
            amount: "1138.80"
          }}
          items={[
            { name: "Юбки HM с паетками (120шт)", quantity: 1.00, price: 999.00, total: 599.40 },
            { name: "Футболки для девочек премиум USA (6 видов, 237шт)", quantity: 1.00, price: 899.00, total: 539.40 }
          ]}
        />
        <SaleItem
          id="145220"
          amount="155.00"
          date="6 июня 20:06"
          user="dina"
          store="Балапан Ош №1"
          customer="Розничный покупатель"
          comment="мээримай"
          itemCount={1}
          paymentDetails={{
            number: "151114",
            client: "Розничный покупатель",
            date: "6 июня 20:06",
            amount: "155.00"
          }}
          items={[
            { name: "Sample Item", quantity: 1.00, price: 155.00, total: 155.00 }
          ]}
        />
      </div>
    </div>
  );
};

const SaleItem = ({ id, amount, date, user, store, customer, comment, itemCount, paymentDetails, items }) => {
  const [isPaidOpen, setIsPaidOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded">
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            Продажа #{id}
            <FaPrint className="ml-2 text-gray-500" size={18} />
          </h3>
          <p className="text-sm text-gray-600">{date} • {user}</p>
          <p className="text-sm text-gray-600">{store} • {customer}</p>
        </div>
        <span className="text-xl font-bold text-gray-800">{amount}com</span>
      </div>
      <div className="bg-orange-100 p-2 text-orange-800">{comment}</div>
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsPaidOpen(!isPaidOpen)}
      >
        <span className="text-gray-700">Оплачен</span>
        {isPaidOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isPaidOpen && (
        <div className="px-4 py-2 bg-gray-50">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Номер</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{paymentDetails.number}</td>
                <td>{paymentDetails.client}</td>
                <td>{paymentDetails.date}</td>
                <td>{paymentDetails.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div 
        className="px-4 py-2 border-t border-gray-300 flex justify-between items-center cursor-pointer"
        onClick={() => setIsItemsOpen(!isItemsOpen)}
      >
        <span className="text-gray-700">Список товаров</span>
        <span className="text-gray-600 flex items-center">
          {itemCount} поз. 
          {isItemsOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </span>
      </div>
      {isItemsOpen && (
        <div className="px-4 py-2 bg-gray-50">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity.toFixed(2)}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Shifts ;
