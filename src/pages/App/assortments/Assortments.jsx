import { useEffect, useState } from 'react';
// import AssortmentsList from "../../../components/App/assortments/AssortmentsList";
import { Suspense} from 'react';
import { RightModal, AssortmentsList, AssortmentCard } from 'components';
import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';


function Assortments({ status }) {
  const navigate = useNavigate();
  const [selectedAssortment, setSelectedAssortment] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  const loaderId = status + '-assortments-list'
  const { assortments } = useLoaderData(loaderId);
  const getTitle = (status) => {
    switch (status) {
      case 'all': return 'Все ассортименты';
      case 'active': return 'Активные ассортименты';
      case 'archived': return 'Архивные ассортименты';
      case 'catalog': return 'Каталог';
    }
  }
  const title = getTitle(status);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={assortments}>
          {assortments => 
            <AssortmentsList 
              assortments={assortments} 
              title={title} 
              selectHandler={(assortment)=>{
                setSelectedAssortment(assortment);  
                setRightModal(true);
              }}/>}
        </Await>
      </Suspense>
      {rightModal && selectedAssortment &&
        <RightModal title={"Ассортимент: "+selectedAssortment.title} afterClose={()=>{
            setSelectedAssortment(null);
            navigate(`/app/assortments/${status}`, { replace: true });
          }
        }>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedAssortment}>
              {(loadedAssortment) => <AssortmentCard assortment={loadedAssortment} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default Assortments;


