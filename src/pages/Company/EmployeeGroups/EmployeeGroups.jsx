import { useState } from 'react';
// import EmployeeGroupsList from "../../../components/App/employees/EmployeeGroupsList";
import { Suspense} from 'react';
import { RightModal, EmployeeGroupsList, EmployeeGroupItem } from "../../../components";
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function EmployeeGroups() {
  let title = "Активные Группы Сотрудников";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployeeGroup, setSelectedEmployeeGroup] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные Группы Сотрудников";
  }
  const { employeeGroups } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={employeeGroups}>
          {employeeGroups => <EmployeeGroupsList employeeGroups={employeeGroups} title={title} selectHandler={(employee)=>{ console.log("selectHandler"); setSelectedEmployeeGroup(employee);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedEmployeeGroup &&
        <RightModal title={"Группа: "+selectedEmployeeGroup.name} afterClose={()=>setSelectedEmployeeGroup(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedEmployeeGroup}>
              {(loadedEmployeeGroup) => <EmployeeGroupItem employeeGroup={loadedEmployeeGroup} />}
            </Await>
          </Suspense>
        </RightModal>
        }
    </>   
  );
}

export default EmployeeGroups;


