import { Link, useSubmit, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';


function BannerItem({ banner, onEdit}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveBanner = async (id, is_archived) => {
      const confirmArchive = window.confirm("Are you sure you want to archive this banner?");
      if (confirmArchive) {
        try {
          const url = `${BASE_URL}/crm/admin-api/banners`; 
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
            showToast({ title: 'Success!', content: 'Banner has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            navigate(is_archived ? "/app/banners/archived" : "/app/banners/"); 
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
  console.log(banner)

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <img className="md:flex-shrink-0 w-full md:w-48 h-48 object-cover" src={banner.image_url} alt={banner.title} />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-gray-800 font-bold">{banner.title}</h3>
          <time className="text-sm text-gray-600">{banner.date}</time>
          <p className="text-gray-600 mt-2">{banner.description}</p>
        </div>
        <div className="flex mt-4">
          <Link to={"/app/banners/"+banner.id + "/edit/"} className="text-blue-600 hover:underline mr-2">Изменить</Link>
          <button onClick={() => archiveBanner(banner.id, !banner.is_archived)}>{ banner.is_archived ? "Восстановить" : "В архив"}</button>
        </div>
      </div>
    </div>
  );
}

export default BannerItem;
