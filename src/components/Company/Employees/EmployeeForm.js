import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button } from 'components';
import { BASE_URL } from 'data/config';

function EmployeeForm({ method = 'POST', employee }) {
  const navigate = useNavigate();
  const { showToast, currentColor } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeGroups, setEmployeeGroups] = useState([]);

  useEffect(() => {
    const fetchEmployeeGroups = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin-api/employee-groups`, {
          headers: {
            Authorization: 'Token token', 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employee groups');
        }
        const data = await response.json();
        setEmployeeGroups(data.response); 
      } catch (error) {
        showToast({ title: 'Error!', content: 'Failed to load employee groups.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    };

    fetchEmployeeGroups();
  }, []);

  const cancelHandler = () => {
    navigate('/company/employees/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('id', employee ? employee.id : '');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/admin-api/employees`, {
        method: employee ? 'PUT' : 'POST',
        headers: {
          Authorization: 'Token token', // Replace 'token' with your actual token
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Error!', content: errorData.message || 'Failed to save employee.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        setIsSubmitting(false);
        return;
      }

      showToast({ title: 'Success!', content: 'Employee saved successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      navigate('/company/employees/');
    } catch (error) {
      showToast({ title: 'Error!', content: 'Network error or invalid response.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error('Fetch error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl px-8" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          defaultValue={employee ? employee.username : ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          id="password"
          type="text"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={employee ? employee.password : ''}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={employee ? employee.first_name : ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={employee ? employee.last_name : ''}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="employee_group" className="block text-gray-700 text-sm font-bold mb-2">Employee Group</label>
        <select
          id="employee_group"
          name="employee_group"
          className="block  w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {employeeGroups.map(group => (
            <option key={group.id} value={group.id} selected={employee && group.id === employee.group.id}>{group.name}</option>
          ))}
        </select>
      </div>

      <div className="float-right">
        <button type="button" onClick={cancelHandler} disabled={isSubmitting} className='mr-3'>
          Cancel
        </button>
        <Button
          color="white"
          bgColor={currentColor}
          disabled={isSubmitting}
          text={isSubmitting ? 'Submitting...' : 'Save'}
          type="submit"
          borderRadius="10px"
          className="m-2"
        />
      </div>
    </form>
  );
}

export default EmployeeForm;
