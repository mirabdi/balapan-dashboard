import { Link, useNavigate} from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';


const EmployeeGroupItem = ({ employeeGroup }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const sections = employeeGroup.sections.filter((section) => section.included);
  console.log(sections)
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
          const url = `${BASE_URL}/admin-api/employee-groups`; 
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
            navigate(is_archived ? "/company/employee-groups/archived" : "/company/employee-groups"); 
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
    <>
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <div className="p-4 flex flex-col justify-between">
        <div>
          <div className="text-lg font-semibold">{employeeGroup.name}</div>
          <div className="text-sm text-gray-600">{employeeGroup.group}</div>
          <div className="text-sm text-gray-600">{employeeGroup.email}</div>
          <div className="text-sm text-gray-600">{employeeGroup.phone}</div>
          <div className="text-sm text-gray-600">
            Created: {formatDate(employeeGroup.created)}
          </div>
          <div className="text-sm text-gray-600">
            Updated: {formatDate(employeeGroup.updated)}
          </div>
        </div>
        <div className="flex mt-4">
          <Link
            to={"/company/employee-groups/" + employeeGroup.id + "/edit/"}
            className="text-blue-600 hover:underline mr-2"
          >
            Изменить
          </Link>
          <button onClick={() => archiveEmployee(employeeGroup.id, !employeeGroup.is_archived)}>
            {employeeGroup.is_archived ? "Восстановить" : "В архив"}
          </button>
        </div>
      </div>
    </div>


    <div className="mb-4 max-w-md mx-auto rounded-lg shadow-lg overflow-hidden my-4">
        <h1 className="text-lg font-semibold p-4">Доступные страницы:</h1>
        {sections && sections.length === 0 && <p className="p-4 text-gray-600">Нет доступных страниц</p>}
        {sections && sections.length != 0 && sections.map((section) => (
          (section.included && 
          <div key={section.id} className="p-4 mb-2 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-colors duration-150">
            <h3 className="text-gray-800 text-md font-semibold mb-2">{section.name}</h3>
            <div className="ml-6">
              {section.sub_sections && section.sub_sections.map((subSection) => (
                <p key={subSection.url} className="text-gray-600 text-sm my-1">
                  {subSection.name}
                </p>
              ))}
            </div>
          </div>)
        ))}
        
      </div>
      </>
  );
};

export default EmployeeGroupItem;
