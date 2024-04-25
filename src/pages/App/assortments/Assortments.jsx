import { useState } from 'react';
// import AssortmentsList from "../../../components/App/assortments/AssortmentsList";
import { Suspense} from 'react';
import { RightModal, AssortmentsList, AssortmentItem } from 'components';
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function Assortments() {
  let title = "Активные ассортименты";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedAssortment, setSelectedAssortment] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные ассортименты";
  }
  const { assortments } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={assortments}>
          {assortments => <AssortmentsList assortments={assortments} title={title} selectHandler={(assortment)=>{setSelectedAssortment(assortment);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedAssortment &&
        <RightModal title={"Ассортимент: "+selectedAssortment.title} afterClose={()=>setSelectedAssortment(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedAssortment}>
              {(loadedAssortment) => <AssortmentItem assortment={loadedAssortment} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default Assortments;


