import { Link, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';
import { gridOrderStatus } from '../../../data/utils';

const OPaymentItem = ({ opayment }) => {
  const { token } = useStateContext();
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveOPayment = async (id, is_archived) => {
      const confirmArchive = window.confirm("Are you sure you want to archive this banner?");
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
            showToast({ title: 'Success!', content: 'OPayment has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            navigate(is_archived ? "/money/opay/archived" : "/money/opay/"); 
          } else {
            const errorData = await response.json();
            showToast({ title: 'Error!', content: errorData.message || 'Could not archive banner.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
          }
        } catch (error) {
          console.error("Fetch error:", error);
          showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
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

  return (
    <>
      <img
        className="md:flex-shrink-0 w-full md:w-64 h-64 object-cover"
        src={opayment.qr}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">ID Счета: {opayment.invoice_id}</div>
          <div className="text-sm text-gray-600">Номер продажи: {opayment.group_id}</div>
          <div className="text-sm text-gray-600">Сумма: {opayment.amount}</div>
          <div className="text-sm text-gray-600">Статус: {opayment.status}</div>
          <div className="text-sm text-gray-600">
            Создан: {formatDate(opayment.created)}
          </div>
          <div className="text-sm text-gray-600">
            Обновлен: {formatDate(opayment.updated)}
          </div>
        </div>
        <div className="flex mt-4">
          {/* <Link
            to={"/money/opay/" + opayment.id + "/edit/"}
            className="text-blue-600 hover:underline mr-2"
          >
            Изменить
          </Link> */}
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
          <button onClick={() => archiveOPayment(opayment.id, !opayment.is_archived)} className="ml-3"> 
            {opayment.is_archived ? "Восстановить" : "В архив"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OPaymentItem;
