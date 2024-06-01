import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';
import { gridOrderStatus } from '../../../data/utils';
import { MdRefresh } from 'react-icons/md';

const OPaymentItem = ({ opayment, afterUpdateStatus }) => {
  const [currOpayment, setCurrOpayment] = useState(opayment);
  const { token, showToast } = useStateContext();
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const archiveOPayment = async (id, is_archived) => {
    const confirmArchive = window.confirm("Вы уверены, что хотите архивировать этот счет?");
    if (confirmArchive) {
      try {
        const url = `${BASE_URL}/money/admin-api/opay`;
  
        const formData = new FormData();
        formData.append("id", id);
        formData.append("is_archived", is_archived);
        
        const response = await fetch(url, {
          method: "PUT", 
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        });
  
        if (response.ok) {
          showToast({ title: 'Успех!', content: 'Счет успешно архивирован.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/pos/opay/" : "/pos/opay/archived"); 
        } else {
          const errorData = await response.json();
          showToast({ title: 'Ошибка!', content: errorData.message || 'Не удалось архивировать счет.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        showToast({ title: 'Ошибка!', content: 'Не удалось связаться с сервером.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    }
  };
  

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
            title: "Ошибка!",
            content: data.detail,
            cssClass: "e-toast-danger",
            icon: "e-error toast-icons",
          });
          return;
        }
        const data = await response.json();
        if(!response.ok){
          showToast({
            title: "Ошибка!",
            content: "Не удалось обновить счет.",
            cssClass: "e-toast-danger",
            icon: "e-error toast-icons",
          });
          return;
        }
        if (data.status === 0) {
          showToast({
            title: "Успешно!",
            content: "Счет успешно обновлен.",
            cssClass: "e-toast-success",
            icon: "e-success toast-icons",
          });
          const updated = data.response;
          setCurrOpayment((old)=>({...old, status: updated.status}));
          if(afterUpdateStatus) afterUpdateStatus(updated);
          
        }
      } catch (error) {
        console.log("Error: ", error);
        showToast({
          title: "Ошибка!",
          content: "Не удалось обновить счет.",
          cssClass: "e-toast-danger",
          icon: "e-error toast-icons",
        });
      }
  
    };
    

  return (
    <>
      <img
        className="md:flex-shrink-0 w-full md:w-64 h-64 object-cover"
        src={currOpayment.qr}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">Номер Счета: {currOpayment.order_id} </div>
          <div className="text-sm text-gray-600">invoice_id: {currOpayment.invoice_id}</div>
          <div className="text-sm text-gray-600">Сумма: {currOpayment.amount}</div>
          <div className="text-sm text-gray-600">Статус: {currOpayment.status}</div>
          <div className="text-sm text-gray-600">Описание: {currOpayment.desc}</div>
          <div className="text-sm text-gray-600">
            Создан: {formatDate(currOpayment.created)}
          </div>
          <div className="text-sm text-gray-600">
            Обновлен: {formatDate(currOpayment.updated)}
          </div>
        </div>
        <div className="flex mt-4">
          {/* <Link
            to={"/money/opay/" + currOpayment.id + "/edit/"}
            className="text-blue-600 hover:underline mr-2"
          >
            Изменить
          </Link> */}
          { currOpayment.status === 'processing' && 
              <>
                {gridOrderStatus({Status: "Обработка", StatusBg: "#FB9678"})}
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 ml-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    updateStatus(currOpayment.id)}
                  }
                >
                  <MdRefresh />
                </button>
              </>
              }
            { currOpayment.status === 'paid' && gridOrderStatus({Status: "Оплачен", StatusBg: "#8BE78B"}) }
          <button onClick={() => archiveOPayment(currOpayment.id, !currOpayment.is_archived)} className="ml-3"> 
            {currOpayment.is_archived ? "Восстановить" : "В архив"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OPaymentItem;
