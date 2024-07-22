import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';

const StoreItem = ({ store }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const navigate = useNavigate();
  const { showToast } = useStateContext();

  const archiveStore = async (id, is_archived) => {
    const confirmArchive = window.confirm("Are you sure you want to archive this store?");
    if (confirmArchive) {
      try {
        const url = `${BASE_URL}/admin-api/stores`; 
        const token = "token"; 

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
          showToast({ title: 'Success!', content: 'Store has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
          navigate(is_archived ? "/company/stores/archived" : "/company/stores/"); 
        } else {
          const errorData = await response.json();
          showToast({ title: 'Error!', content: errorData.message || 'Could not archive store.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">{store.name}</div>
          <div className="text-sm text-gray-600">{store.address}</div>
          <div className="text-sm text-gray-600">Cloudshop ID: {store.cloudshop_id}</div>
          <div className="text-sm text-gray-600">
            Created: {formatDate(store.created)}
          </div>
          <div className="text-sm text-gray-600">
            Updated: {formatDate(store.updated)}
          </div>
        </div>
        <div className="flex mt-4">
          <Link
            to={"/company/stores/" + store.id + "/edit/"}
            className="text-blue-600 hover:underline mr-2"
          >
            Изменить
          </Link>
          <button onClick={() => archiveStore(store.id, !store.is_archived)}>
            {store.is_archived ? "Восстановить" : "В архив"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
