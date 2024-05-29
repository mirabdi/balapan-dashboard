import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, EmployeesList, EmployeeItem } from "../../../components";
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';

async function loadEmployeesList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/employees";
  if (is_archived) {
    url += "?is_archived=" + is_archived;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to load employees");
  } else {
    const resData = await response.json();
    return resData.response;
  }
}

function Employees() {
  let title = "Активные сотрудники";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
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
    fetchEmployees();
  }, [showToast, lastSegment]);

  return (
    <>
      {loading ? (
        <p className="flex flex-wrap">Loading...</p>
      ) : (
        <EmployeesList employees={employees} title={title} selectHandler={(employee) => {
          console.log("selectHandler");
          setSelectedEmployee(employee);
          setRightModal(true);
        }} />
      )}
      {rightModal && selectedEmployee && (
        <RightModal title={"Cотрудник: " + selectedEmployee.name} afterClose={() => setSelectedEmployee(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <EmployeeItem employee={selectedEmployee} />
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      )}
    </>
  );
}

export default Employees;
