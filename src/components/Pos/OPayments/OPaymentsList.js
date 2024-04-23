import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";
import { gridOrderStatus } from "data/utils";


const OPaymentsList = ({opayments, title, selectHandler}) => {
  const navigate = useNavigate();
  const { token, showToast } = useStateContext();
  const updateStatus = async (id) => {
    try{
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
          title: "Error!",
          content: data.detail,
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
        return;
      }
      const data = await response.json();
      if(!response.ok){
        showToast({
          title: "Error!",
          content: "Failed to update payment.",
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
        return;
      }
      if (data.status === 0) {
        showToast({
          title: "Success!",
          content: "Payment updated successfully.",
          cssClass: "e-toast-success",
          icon: "e-success toast-icons",
        });
      }
      navigate('/pos/opay/active');
    } catch (error) {
      showToast({
        title: "Error!",
        content: "Failed to update payment.",
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    }

  };

  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <div className="overflow-x-auto">
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
                ID счета
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Номер продажи
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
            {opayments.map((opayment) => (
              <tr key={opayment.id} onClick={()=>selectHandler(opayment)} className="hover:bg-gray-100 cursor-pointer"> 
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
                  { opayment.status === 'processing' && 
                    <>
                      {gridOrderStatus({Status: "Обработка", StatusBg: "#FB9678"})}
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 ml-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateStatus(opayment.id)}
                        }
                      >
                        R
                      </button>
                    </>
                   }
                  { opayment.status === 'paid' && gridOrderStatus({Status: "Оплачен", StatusBg: "#8BE78B"}) }
                  
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(opayment.updated)}
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

export default OPaymentsList;