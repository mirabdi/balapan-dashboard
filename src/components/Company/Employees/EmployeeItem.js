// import { Link, useNavigate} from 'react-router-dom';
// import { useStateContext } from '../../../contexts/ContextProvider';
// import { BASE_URL } from '../../../data/config';


// function EmployeeItem({ employee, onEdit}) {
//   const navigate = useNavigate();
//   const { showToast } = useStateContext();
//   const archiveEmployee = async (id, is_archived) => {
//       const confirmArchive = window.confirm("Are you sure you want to archive this employee?");
//       if (confirmArchive) {
//         try {
//           const url = `${BASE_URL}/admin-api/employees`; 
//           const token = "token"; 

//           const formData = new FormData();
//           formData.append("id", id);
//           formData.append("is_archived", is_archived);
          
//           const response = await fetch(url, {
//             method: "PUT", 
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//             body: formData,
//           });
    
//           if (response.ok) {
//             showToast({ title: 'Success!', content: 'Employee has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
//             navigate(is_archived ? "/company/employees/archived" : "/company/employees/"); 
//           } else {
//             const errorData = await response.json();
//             showToast({ title: 'Error!', content: errorData.message || 'Could not archive employee.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//           showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//         }
//       }
//     };
//   console.log(employee)

//   return (
//     <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
//       <img className="md:flex-shrink-0 w-full md:w-48 h-48 object-cover" src={employee.name} alt={employee.name} />
//       <div className="p-4 flex flex-col justify-between">
//         <div>
//           <h3 className="text-xl text-gray-800 font-bold">{employee.name}</h3>
//           <time className="text-sm text-gray-600">{employee.name}</time>
//           <p className="text-gray-600 mt-2">{employee.name}</p>
//         </div>
//         <div className="flex mt-4">
//           <Link to={"/app/employees/"+employee.id + "/edit/"} className="text-blue-600 hover:underline mr-2">Изменить</Link>
//           <button onClick={() => archiveEmployee(employee.id, !employee.is_archived)}>{ employee.is_archived ? "Восстановить" : "В архив"}</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeItem;
const EmployeeItem = ({ taskType, taskDescription, taskDate, actionButton, onActionButtonClick }) => {
  return (
      <div className="flex items-center justify-between p-4 border-b">
          <div>
              <div className="font-bold">{taskType}</div>
              <div>{taskDescription}</div>
              <div className="text-sm text-gray-500">{taskDate}</div>
          </div>
          <button
              onClick={onActionButtonClick}
              className={`px-4 py-2 rounded ${actionButton.color}`}
          >
              {actionButton.text}
          </button>
      </div>
  );
};
export default EmployeeItem;