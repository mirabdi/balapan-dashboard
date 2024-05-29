import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, EmployeeGroupsList, EmployeeGroupItem } from "../../../components";
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';

async function loadEmployeeGroupsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/employee-groups";
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
    throw new Error("Failed to load employee groups");
  } else {
    const resData = await response.json();
    return resData.response;
  }
}

function EmployeeGroups() {
  let title = "Активные Группы Сотрудников";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployeeGroup, setSelectedEmployeeGroup] = useState(null);
  const [employeeGroups, setEmployeeGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { rightModal, setRightModal, showToast } = useStateContext();

  if (lastSegment === 'archived') {
    title = "Архивные Группы Сотрудников";
  }

  useEffect(() => {
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
    fetchEmployeeGroups();
  }, [showToast, lastSegment]);

  return (
    <>
      {loading ? (
        <p className="flex flex-wrap">Loading...</p>
      ) : (
        <EmployeeGroupsList employeeGroups={employeeGroups} title={title} selectHandler={(employee) => {
          console.log("selectHandler");
          setSelectedEmployeeGroup(employee);
          setRightModal(true);
        }} />
      )}
      {rightModal && selectedEmployeeGroup && (
        <RightModal title={"Группа: " + selectedEmployeeGroup.name} afterClose={() => setSelectedEmployeeGroup(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <EmployeeGroupItem employeeGroup={selectedEmployeeGroup} />
          </Suspense>
        </RightModal>
      )}
    </>
  );
}

export default EmployeeGroups;
