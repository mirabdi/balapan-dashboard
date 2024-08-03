import React, { useState, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { FaPrint } from 'react-icons/fa';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [shiftPage, setShiftPage] = useState(1);
  const [shiftLoading, setShiftLoading] = useState(false);
  const { showToast, token } = useStateContext();

  const fetchShifts = async (pageNum = 1) => {
    setShiftLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/pos/admin-api/shifts?page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      if (data.status === 0) {
        setShifts(prevShifts => [...prevShifts, ...data.response]);
        if (pageNum === 1 && data.response.length > 0) {
          setSelectedShift(data.response[0].number);
        }
      } else {
        showToast({
          title: 'Ошибка!',
          content: data.message || 'Не удалось загрузить смены.',
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons',
        });
      }
    } catch (error) {
      showToast({
        title: 'Ошибка!',
        content: 'Не удалось связаться с сервером.',
        cssClass: 'e-toast-danger',
        icon: 'e-error toast-icons',
      });
    } finally {
      setShiftLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [token, showToast]);

  const loadMoreShifts = async () => {
    setShiftPage(prevPage => prevPage + 1);
    await fetchShifts(shiftPage + 1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white overflow-y-auto border-r border-gray-200">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedShift === shift.number ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedShift(shift.number)}
          >
            <div className="flex items-center text-gray-600 mb-1">
              {new Date(shift.created).toLocaleDateString('ru-RU')}
            </div>
            <div className="font-semibold text-gray-800">Смена #{shift.number}</div>
            <div className="text-sm text-gray-500">{formatDuration(shift.duration)}</div>
            <div className="flex justify-between mt-2">
              <span className="text-green-600">+{shift.docs_stats.sales.sum?.toFixed(2) || '0.00'}</span>
              <span className="text-red-600">-{shift.docs_stats.return_sales.sum?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        ))}
        <div className="p-4 text-center">
          <button
            onClick={loadMoreShifts}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={shiftLoading}
          >
            {shiftLoading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      </div>
      <div className="w-3/4 overflow-y-auto p-6">
        {selectedShift && <SalesDashboard shift={shifts.find(shift => shift.number === selectedShift)} />}
      </div>
    </div>
  );
};

const formatDuration = (duration) => {
  const seconds = parseInt(duration, 10);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;
  return `${hours} ч ${minutes} мин ${secondsLeft} сек`;
};

const SalesDashboard = ({ shift }) => {
  const [salesPage, setSalesPage] = useState(1);
  const [salesLoading, setSalesLoading] = useState(false);
  const [displayedDocs, setDisplayedDocs] = useState([]);

  useEffect(() => {
    setDisplayedDocs(shift.docs.slice(0, salesPage * 10));
  }, [shift.docs, salesPage]);

  const loadMoreSales = () => {
    setSalesPage(prevPage => prevPage + 1);
  };

  return (
    <div className="font-sans max-w-3xl mx-auto text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Смена #{shift.number}</h1>
        <p className="text-sm text-gray-600">{shift.store} • {new Date(shift.created).toLocaleDateString('ru-RU')} — {new Date(shift.updated).toLocaleDateString('ru-RU')} ({formatDuration(shift.duration)})</p>
      </div>
      <div className="flex mb-8">
        <div className="w-1/2 pr-2">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Продажи</h2>
            <div className="text-4xl font-bold mb-4 text-gray-800">{shift.docs_stats.sales.quantity}</div>
            <div className="space-y-2 text-gray-700">
              {/* <div className="flex justify-between">
                <span>Наличные</span>
                <span>{shift.docs_stats.sales.sum?.toFixed(2) || '0.00'} com</span>
              </div>
              <div className="flex justify-between">
                <span>Безналичные</span>
                <span>0.00 com</span>
              </div> */}
              <div className="flex justify-between font-semibold">
                <span>Сумма продаж</span>
                <span>{shift.docs_stats.sales.sum?.toFixed(2) || '0.00'} com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Возвраты</h2>
            <div className="text-4xl font-bold mb-4 text-gray-800">{shift.docs_stats.return_sales.quantity}</div>
            <div className="space-y-2 text-gray-700">
              {/* <div className="flex justify-between">
                <span>Наличные</span>
                <span>{shift.docs_stats.return_sales.sum?.toFixed(2) || '0.00'} com</span>
              </div>
              <div className="flex justify-between">
                <span>Безналичные</span>
                <span>0.00 com</span>
              </div> */}
              <div className="flex justify-between font-semibold">
                <span>Сумма возвратов продаж</span>
                <span>{shift.docs_stats.return_sales.sum?.toFixed(2) || '0.00'} com</span>
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
            <span>{shift.open_money} com</span>
          </div>
          <div className="flex justify-between">
            <span>Сумма всех взносов</span>
            <span>{shift.docs_stats.sales.sum?.toFixed(2) || '0.00'} com</span>
          </div>
          <div className="flex justify-between">
            <span>Сумма всех выносов</span>
            <span>{(shift.docs_stats.sales.sum-shift.close_money)?.toFixed(2) || '0.00'} com</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Сумма на конец смены</span>
            <span>{shift.close_money} com</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {displayedDocs.map((doc) => (
          <SaleItem key={doc.id} doc={doc} />
        ))}
        <div className="p-4 text-center">
          <button
            onClick={loadMoreSales}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={salesLoading || displayedDocs.length === shift.docs.length}
          >
            {salesLoading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SaleItem = ({ doc }) => {
  const [isPaidOpen, setIsPaidOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded mb-4">
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            Продажа #{doc.number}
            <FaPrint className="ml-2 text-gray-500" size={18} />
          </h3>
          <p className="text-sm text-gray-600">{new Date(doc.created).toLocaleDateString('ru-RU')} • {doc.store}</p>
          <p className="text-sm text-gray-600">{doc.client}</p>
        </div>
        <span className="text-xl font-bold text-gray-800">{doc.sum} com</span>
      </div>
      <div className="bg-orange-100 p-2 text-orange-800">{doc.comment}</div>
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
                <td>{doc.number}</td>
                <td>{doc.client}</td>
                <td>{new Date(doc.created).toLocaleDateString('ru-RU')}</td>
                <td>{doc.sum}</td>
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
          {doc.positions.length} поз. 
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
              {doc.positions.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Shifts;
