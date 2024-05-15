import { Link, useSubmit, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';
import {MyImage} from 'components';

function AssortmentCard({ assortment, onEdit, afterArchive}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveAssortment = async (id, is_archived) => {
      const confirmArchive = window.confirm("Are you sure you want to archive this assortment?");
      if (confirmArchive) {
        try {
          const url = `${BASE_URL}/crm/admin-api/assortments`; 
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
            showToast({ title: 'Success!', content: 'Assortment has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            navigate(is_archived ? "/app/assortments/" : "/app/assortments/archived"); 
            if(afterArchive) afterArchive(id);
          } else {
            const errorData = await response.json();
            showToast({ title: 'Error!', content: errorData.message || 'Could not archive assortment.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
          }
        } catch (error) {
          // console.error("Fetch error:", error);
          showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        }
      }
    };

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <MyImage src={assortment.image_url} alt={assortment.title} />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-gray-800 font-bold">{assortment.title}</h3>
          <time className="text-sm text-gray-600">{assortment.date}</time>
          <p className="text-gray-600 mt-2">{assortment.description}</p>
        </div>
        <div className="flex mt-4">
          { onEdit 
            ? <button onClick={onEdit} className="text-blue-600 hover:underline mr-2">Изменить</button>
            : <Link to={"/app/assortments/"+assortment.id + "/edit/"} className="text-blue-600 hover:underline mr-2">Изменить</Link>
        }
          <button onClick={() => archiveAssortment(assortment.id, !assortment.is_archived)}>{ assortment.is_archived ? "Восстановить" : "В архив"}</button>
        </div>
      </div>
    </div>
  );
}

export default AssortmentCard;
