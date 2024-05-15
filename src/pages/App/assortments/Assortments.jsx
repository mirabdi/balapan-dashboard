import { useEffect, useState, useRef } from 'react';
// import AssortmentsList from "../../../components/App/assortments/AssortmentsList";
import { Suspense} from 'react';
import { RightModal, AssortmentsList, AssortmentCard } from 'components';
import { Await, useNavigate } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';
import { BASE_URL } from 'data/config';

function Assortments({ status }) {
  const navigate = useNavigate();
  const [selectedAssortment, setSelectedAssortment] = useState(null);
  const [assortments, setAssortments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const { rightModal, setRightModal, showToast, token} = useStateContext();
  const afterArchive = (id) => {
    setAssortments(assortments.filter((assortment) => assortment.id !== id));
  };
  const loadAssortmentsList = async (status='active', token, page=1, query="") => {
    let url = `${BASE_URL}/crm/admin-api/assortments?status=${status}&page=${page}&query=${query}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        let message = 'Failed to load assortments';
        try {
          const resData = await response.json();
          message = resData.message;
        } catch (error) {
          console.error('Failed to parse error message:', error);
        }
        throw new Error(message);
      }
      const resData = await response.json();
      return resData.response;
    } catch (error) {
      showToast({ title: 'Error!', content: error.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' })
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (status) => {
    switch (status) {
      case 'all': return 'Все ассортименты';
      case 'active': return 'Активные ассортименты';
      case 'archived': return 'Архивные ассортименты';
      case 'catalog': return 'Каталог';
    }
  }
  
  const loadMoreAssortments = async () => {
    // scrollPosition.current = listRef.current ? listRef.current.scrollTop : 0;
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedAssortments = await loadAssortmentsList(status, token, nextPage, query);
    if (Array.isArray(loadedAssortments)) {
      setAssortments((prev) => [...prev, ...loadedAssortments]);
    } else {
      console.error('Loaded assortments is not an array:', loadedAssortments);
    }
    
  };

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);  // Reset to the first page for a new search
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedAssortments = await loadAssortmentsList(status, token, 1, newQuery);
      setAssortments(loadedAssortments);
    }, 2000);
  };



  useEffect(async () => {
    if (token) {
      const loadedAssortments = await loadAssortmentsList(status, token, 1, "");
      setAssortments(loadedAssortments);
    }
  }, [status, token]);
  const title = getTitle(status);


  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        {(
          
          <>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            className="search-input float-right mb-4 p-2 border rounded-lg shadow-md"
          />
          <AssortmentsList 
            assortments={assortments} 
            title={title} 
            selectHandler={(assortment) => {
              setSelectedAssortment(assortment);  
              setRightModal(true);
            }}
            afterArchive={afterArchive}
          />
          <button onClick={loadMoreAssortments}   className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
              {loading ? 'Загрузка...' : 'Загрузить еще'}
            </button>
            </>
        ) }
      </Suspense>
      {rightModal && selectedAssortment &&
        <RightModal title={"Ассортимент: "+selectedAssortment.title} afterClose={()=>{
            setSelectedAssortment(null);
            navigate(`/app/assortments/${status}`, { replace: true });
          }
        }>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedAssortment}>
              {(loadedAssortment) => <AssortmentCard assortment={loadedAssortment} afterArchive={afterArchive}/>}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default Assortments;






