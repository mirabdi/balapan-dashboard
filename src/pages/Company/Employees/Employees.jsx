import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, EmployeesList, EmployeeItem } from "components";
import { loadEmployeesList } from './Services';
import { useStateContext } from 'contexts/ContextProvider';
import { BASE_URL } from 'data/config';

function Employees() {
  let title = "Активные сотрудники";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setЗагрузка] = useState(true);
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
        setЗагрузка(false);
      }
    }
    fetchEmployees();
  }, [showToast, lastSegment]);

  return (
    <>
      {loading ? (
        <p className="flex flex-wrap">Загрузка...</p>
      ) : (
        <EmployeesList employees={employees} title={title} selectHandler={(employee) => {
          console.log("selectHandler");
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
