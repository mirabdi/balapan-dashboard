import { useState } from 'react';
// import OPaymentsList from "../../../components/App/opayments/OPaymentsList";
import { Suspense} from 'react';
import { RightModal, OPaymentsList, OPaymentItem } from "../../../components";
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function OPayments() {
  let title = "Активные сотрудники";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedOPayment, setSelectedOPayment] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные сотрудники";
  }
  const { opayments } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={opayments}>
          {opayments => <OPaymentsList opayments={opayments} title={title} selectHandler={(employee)=>{ console.log("selectHandler"); setSelectedOPayment(employee);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedOPayment &&
        <RightModal title={"Чек: "+selectedOPayment.invoice_id} afterClose={()=>setSelectedOPayment(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedOPayment}>
              {(loadedOPayment) => <OPaymentItem opayment={loadedOPayment} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default OPayments;


