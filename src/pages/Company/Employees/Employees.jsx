import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, EmployeesList, EmployeeItem } from "components";
import { loadEmployeesList } from './Services';
import { loadEmployeeGroupsList } from 'pages';
import { useStateContext } from 'contexts/ContextProvider';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

function Employees() {
  let title = "Активные сотрудники";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeGroups, setEmployeeGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { rightModal, setRightModal, showToast } = useStateContext();

  if (lastSegment === 'archived') {
    title = "Архивные сотрудники";
  }

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employeesData = await loadEmployeesList(lastSegment === 'archived');
        setEmployees(employeesData);
      } catch (error) {
        showToast({
          title: 'Ошибка!',
          content: error.message,
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons'
        });
      } finally {
        setLoading(false);
      }
    }

    async function fetchEmployeeGroups() {
      try {
        const employeeGroupsData = await loadEmployeeGroupsList(lastSegment === 'archived');
        setEmployeeGroups(employeeGroupsData);
      } catch (error) {
        showToast({
          title: 'Ошибка!',
          content: error.message,
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
    fetchEmployeeGroups();
  }, [showToast, lastSegment]);

  const handleGroupChange = (selectedItems) => {
    setSelectedGroups(selectedItems);
  };

  const filteredEmployees = selectedGroups.length > 0
    ? employees.filter(employee => selectedGroups.includes(employee.group.name))
    : employees;

  return (
    <>
      <div className="p-4">
        <MultiSelectComponent
          id="employeeGroups"
          placeholder="Select employee groups"
          dataSource={employeeGroups}
          fields={{ text: 'name', value: 'name' }}
          change={(e) => handleGroupChange(e.value)}
          className="block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          mode="Box"
        />
      </div>
      {loading ? (
        <p className="flex flex-wrap">Загрузка...</p>
      ) : (
        <EmployeesList employees={filteredEmployees} title={title} selectHandler={(employee) => {
          setSelectedEmployee(employee);
          setRightModal(true);
        }} />
      )}
      {rightModal && selectedEmployee && (
        <RightModal title={"Cотрудник: " + selectedEmployee.name} afterClose={() => setSelectedEmployee(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Загрузка...</p>}>
            <EmployeeItem employee={selectedEmployee} />
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      )}
    </>
  );
}

export default Employees;
