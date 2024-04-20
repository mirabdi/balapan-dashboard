import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   for (let i = 0; i < result.length; i++) {
//     result[i].priority = i;
//   }
//   return result;
// };


// function EmployeesList({ employees, title, selectHandler }) {
//   const [currEmployees, setCurrEmployees] = useState(employees);
//   const navigate = useNavigate();
//   const { showToast } = useStateContext();
//   const archiveEmployee = async (id, is_archived) => {
//     const confirmArchive = window.confirm("Are you sure you want to archive this employee?");
//     if (confirmArchive) {
//       try {
//         // Create the URL for the request
//         const url = `${BASE_URL}/admin-api/employees`; // Adjust URL path as needed
//         const token = "token";  // Ensure you have the correct token
  
//         // Create FormData object and append necessary fields
//         const formData = new FormData();
//         formData.append("id", id);
//         formData.append("is_archived", is_archived);
  
//         // Make the fetch request to update the employee
//         const response = await fetch(url, {
//           method: "PUT",  // Since we are updating part of the resource, PUT is appropriate
//           headers: {
//             Authorization: `Token ${token}`,  // Set authorization token
//           },
//           body: formData,
//         });
  
//         // Check the response status
//         if (response.ok) {
//           showToast({ title: 'Success!', content: 'Employee has been successfully archived.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
//           navigate(is_archived ? "/company/employees/archived" : "/company/employees/");  // Redirect based on the archive status
//         } else {
//           // Throw an error if the server responded with a non-2xx status
//           const errorData = await response.json();
//           showToast({ title: 'Error!', content: errorData.message || 'Could not archive employee.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//         }
//       } catch (error) {
//         // Handle any errors that occurred during fetch
//         console.error("Fetch error:", error);
//         showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//       }
//     }
//   };

//   const onDragEnd = async (result) => { 
//       if (!result.destination) {
//         return;
//       }
  
//       const newEmployees = reorder(
//         currEmployees,
//         result.source.index,
//         result.destination.index
//       );
//       setCurrEmployees(newEmployees);
//       try {
//         const token = "token";  // Ensure you have the correct token
//         const response = await fetch(BASE_URL + "/admin-api/employees/update-priority", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//           body: JSON.stringify({ employees: newEmployees }),  // Send only the IDs in their new order
//         });
    
//         if (response.ok) {
//           // Only update state if the backend has successfully processed the request
//           showToast({ title: 'Success!', content: 'Employee order has been updated.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
//         } else {
//           // If the server responds with an error, inform the user and do not update local state
//           const errorData = await response.json();
//           showToast({ title: 'Error!', content: errorData.message || 'Failed to update employee order.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//         }
//       } catch (error) {
//         // Handle any errors that occurred during fetch
//         showToast({ title: 'Error!', content: 'Failed to communicate with server.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
//         console.error("Fetch error:", error);
//         setCurrEmployees(currEmployees);
//       }
      

//   };


//   return (
    
//     <div className="bg-white py-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
      
//       <Droppable droppableId="employees">
//           {(provided, snapshot) => (
//             <ul 
//             className="max-w-4xl mx-auto"
//             {...provided.droppableProps} 
//             ref={provided.innerRef}
//             >
//             {currEmployees.map((employee, index) => (
//               <Draggable key={employee.id} draggableId={`ID-${employee.id}`} index={index}>
//               {(provided, snapshot) => (
//                 <li
//                 ref={provided.innerRef}
//                 key={employee.id}
//                 {...provided.draggableProps}
//                 {...provided.dragHandleProps}
//                 className="bg-gray-200 rounded-lg overflow-hidden shadow-lg my-4 flex relative"
//               >
//                 <div to={`/app/employees/${employee.id}`} onClick={()=>selectHandler(employee)} className="flex items-center hover:bg-gray-100 w-full text-decoration-none">
//                   <img src={employee.image_url} alt={employee.name} className="flex-none w-48 h-48 object-cover rounded-l-lg" />
//                   <div className="p-4 flex flex-col justify-between leading-normal">
//                     <h2 className="font-bold text-xl mb-2 text-gray-900">{employee.name}</h2>
//                     <p className="mb-2 text-gray-900">{employee.name}</p>
//                     <time className="text-sm text-gray-600">{employee.name}</time>
//                   </div>
//                 </div>
//                 {/* Buttons container */}
//                 <div className="absolute top-0 right-0 m-4">
//                   {/* Archive Button */}
//                   <button
//                     onClick={() => archiveEmployee(employee.id, !employee.is_archived)}
//                     className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
//                   >
//                     {employee.is_archived ? "Восстановить" : "В архив"}
//                   </button>
//                   {/* Edit Button */}
//                   <Link
//                     to={`/app/employees/${employee.id}/edit/`}
//                     className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
//                   >
//                     Edit
//                   </Link>
//                 </div>
//               </li>
//               )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//             </ul>
//           )}
          
//         </Droppable>
//     </DragDropContext>

//     </div>
//   );
// }

// export default EmployeesList;
const EmployeesList = ({employees, title, selectHandler}) => {
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
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Имя пользователя
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Имя
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Недавняя активность
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Группа
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
                Обновлен
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} onClick={selectHandler}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.first_name} {employee.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.last_seen}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.group}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.created}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.updated}
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

export default EmployeesList;