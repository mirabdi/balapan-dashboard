import { useState, useEffect } from 'react';
// import OPaymentsList from "../../../components/App/opayments/OPaymentsList";
import { Suspense} from 'react';
import { RightModal, OPaymentsList, OPaymentItem } from "../../../components";
import { Await } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';
import { useStateContext} from '../../../contexts/ContextProvider';

function OPayments() {
  const [opayments, setOpayments] = useState([]); 
  const [selectedOPayment, setSelectedOPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { rightModal, setRightModal, showToast, token} = useStateContext();

  let title = "Активные чеки";
  const url = new URL(window.location.href);
  const is_archived = url.pathname.split('/').pop() === 'archived';
  if(is_archived){
    title = "Архивные чеки";
  }

  const loadMoreOpayments = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedOpayments = await loadOPaymentsList(is_archived, token, nextPage, query);
    if (Array.isArray(loadedOpayments)) {
      setOpayments((prev) => [...prev, ...loadedOpayments]);
    } else {
      console.error('Loaded payments is not an array:', loadedOpayments);
    }
    
  };
  useEffect(() => {
    async function fetchOPayments() {
      try {
        setLoading(true);
        const response = await loadOPaymentsList(is_archived, token, page, query);
        setOpayments(response);
      } catch (err) {
        showToast({
          title: 'Ошибка!',
          content: err.message || 'Failed to load opayments',
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons'
        });
      } finally {
        setLoading(false);
      }
    }
    if(selectedOPayment === null){
      fetchOPayments();
    }
  }, [token, is_archived, selectedOPayment]);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <OPaymentsList 
          opayments={opayments} 
          title={title} 
          selectHandler={(employee)=>{
            setSelectedOPayment(employee);  
            setRightModal(true);
          }}/>
          <button onClick={loadMoreOpayments}   className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
              {loading ? 'Загрузка...' : 'Загрузить еще'}
            </button>

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



async function loadOPaymentsList(is_archived = false, token, page=1, query="") {
  let url = `${BASE_URL}/money/admin-api/opay?is_archived=${is_archived}&page=${page}&query=${query}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  // if !ok, throw message from response, else return list of opayments
  if (!response.ok) {
    let message = 'Failed to load orders';
    try {
      const resData = await response.json();
      message = resData.message;
    } catch (error) {
      console.error('Failed to parse error message:', error);
    }
    throw new Error(message);
  } else {
    const resData = await response.json();
    return resData.response;
  }
}