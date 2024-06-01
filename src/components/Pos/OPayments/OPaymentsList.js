import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { gridOrderStatus } from "data/utils";
import { MdRefresh } from 'react-icons/md';

const OPaymentsList = ({ opayments, title, selectHandler }) => {
  const navigate = useNavigate();
  const { token, showToast } = useStateContext();
  const [currOpayments, setCurrOpayments] = useState(opayments);

  const updateStatus = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/money/admin-api/opay/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ status: 1 }),
      });
      if (!response.ok) {
        const data = await response.json();
        showToast({
          title: "Ошибка!",
          content: data.detail,
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        showToast({
          title: "Ошибка!",
          content: "Не удалось обновить платеж.",
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
        return;
      }
      if (data.status === 0) {
        showToast({
          title: "Успешно!",
          content: "Платеж успешно обновлен.",
          cssClass: "e-toast-success",
          icon: "e-success toast-icons",
        });
        const updated = data.response;
        setCurrOpayments(currOpayments.map((opayment) => (opayment.id === updated.id ? updated : opayment)));
      }
      navigate('/pos/opay/active');
    } catch (error) {
      showToast({
        title: "Ошибка!",
        content: "Не удалось обновить платеж.",
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    }
  };

  useEffect(() => {
    setCurrOpayments(opayments);
  }, [opayments]);

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="py-2 align-middle inline-block min-w-full">
      <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                invoice_id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Номер счета
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Сумма
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Создан
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Статус
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Обновлен
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currOpayments.length !== 0 ? currOpayments.map((opayment) => (
              <tr key={opayment.id} onClick={() => selectHandler(opayment)} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opayment.invoice_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opayment.order_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {opayment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(opayment.created)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {opayment.status === 'processing' && (
                    <>
                      {gridOrderStatus({ Status: "Обработка", StatusBg: "#FB9678" })}
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 ml-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateStatus(opayment.id);
                        }}
                      >
                        <MdRefresh />
                      </button>
                    </>
                  )}
                  {opayment.status === 'paid' && gridOrderStatus({ Status: "Оплачен", StatusBg: "#8BE78B" })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(opayment.updated)}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-sm text-gray-500">
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OPaymentsList;
