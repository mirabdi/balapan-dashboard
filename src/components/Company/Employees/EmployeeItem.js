import { Link, useNavigate} from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { BASE_URL } from 'data/config';


const EmployeeItem = ({ employee }) => {
  // Formatting the dates and time
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const navigate = useNavigate();
  const { showToast } = useStateContext();
  const archiveEmployee = async (id, is_archived) => {
      const confirmArchive = window.confirm("Are you sure you want to archive this banner?");
      if (confirmArchive) {
        try {
          const url = `${BASE_URL}/admin-api/employees`; 
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
            showToast({ title: 'Success!', content: 'Employee has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
            navigate(is_archived ? "/company/employees/archived" : "/company/employees/"); 
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

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <img
        className="md:flex-shrink-0 w-full md:w-48 h-48 object-cover"
        src={employee.image_url}
        alt={employee.name}
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">{employee.name}</div>
          <div className="text-sm text-gray-600">{employee.group ? employee.group.name: " - "}</div>
          <div className="text-sm text-gray-600">{employee.email}</div>
          <div className="text-sm text-gray-600">{employee.phone}</div>
          <div className="text-sm text-gray-600">
            Created: {formatDate(employee.created)}
          </div>
          <div className="text-sm text-gray-600">
            Updated: {formatDate(employee.updated)}
          </div>
          <div className="text-sm text-gray-600">
            Last Seen: {formatTime(employee.last_seen)}
          </div>
        </div>
        <div className="flex mt-4">
          <Link
            to={"/company/employees/" + employee.id + "/edit/"}
            className="text-blue-600 hover:underline mr-2"
          >
            Изменить
          </Link>
          <button onClick={() => archiveEmployee(employee.id, !employee.is_archived)}>
            {employee.is_archived ? "Восстановить" : "В архив"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
