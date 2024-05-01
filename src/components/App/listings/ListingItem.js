import { Link, useSubmit, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';


function ListingItem({ listing, onEdit}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveListing = async (id, is_archived) => {
      const confirmArchive = window.confirm("Are you sure you want to archive this listing?");
      if (confirmArchive) {
        try {
          const url = `${BASE_URL}/crm/admin-api/listings`; 
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
            showToast({ 
              title: 'Успех!', 
              content: 'Листинг успешно архивирован.', 
              cssClass: 'e-toast-success', 
              icon: 'e-success toast-icons' 
            });
            navigate(is_archived ? "/app/listings/archived" : "/app/listings/"); 
          } else {
            const errorData = await response.json();
            showToast({ 
              title: 'Ошибка!', 
              content: errorData.message || 'Не удалось архивировать листинг.', 
              cssClass: 'e-toast-danger', 
              icon: 'e-error toast-icons' 
            });
          }
        } catch (error) {
          console.error("Fetch error:", error);
          showToast({
            title: 'Ошибка!',
            content: 'Не удалось связаться с сервером.',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
          
        }
      }
    };
  console.log(listing)

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <img className="md:flex-shrink-0 w-full md:w-48 h-48 object-cover" src={listing.image_url} alt={listing.title} />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-gray-800 font-bold">Название - {listing.title}</h3>
          <p className="text-gray-600 mt-2">Описание - {listing.description}</p>
          <p className="text-gray-600">Цена - {listing.sale_price}</p>
          <p className="text-gray-600">Bonus- {listing.bonus}</p>
          <p className="text-gray-600">Скидка - {listing.discount_percent}</p>
        </div>
        <div className="flex mt-4">
          <Link to={"/app/listings/"+listing.id + "/edit/"} className="text-blue-600 hover:underline mr-2">Изменить</Link>
          <button onClick={() => archiveListing(listing.id, !listing.is_archived)}>{ listing.is_archived ? "Восстановить" : "В архив"}</button>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
