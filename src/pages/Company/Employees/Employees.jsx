import { useState } from 'react';
// import EmployeesList from "../../../components/App/employees/EmployeesList";
import { Suspense} from 'react';
import { RightModal, EmployeesList, EmployeeItem } from "../../../components";
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function Employees() {
  let title = "Активные баннеры";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные баннеры";
  }
  const { employees } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={employees}>
          {employees => <EmployeesList employees={employees} title={title} selectHandler={(employee)=>{ console.log("selectHandler"); setSelectedEmployee(employee);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedEmployee &&
        <RightModal title={"Пост: "+selectedEmployee.title} afterClose={()=>setSelectedEmployee(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedEmployee}>
              {(loadedEmployee) => <EmployeeItem employee={loadedEmployee} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default Employees;


