import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { RightModal, StoresList, StoreItem } from "../../../components";
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from '../../../data/config';

async function loadStoresList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/stores";
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
    throw new Error("Failed to load stores");
  } else {
    const resData = await response.json();
    return resData.response;
  }
}

function Stores() {
  let title = "Активные магазины";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { rightModal, setRightModal, showToast } = useStateContext();

  if (lastSegment === 'archived') {
    title = "Архивные магазины";
  }

  useEffect(() => {
    async function fetchStores() {
      try {
        const storesData = await loadStoresList(lastSegment === 'archived');
        setStores(storesData);
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
    fetchStores();
  }, [showToast, lastSegment]);

  return (
    <>
      {loading ? (
        <p className="flex flex-wrap">Загрузка...</p>
      ) : (
        <StoresList stores={stores} title={title} selectHandler={(store) => {
          setSelectedStore(store);
          setRightModal(true);
        }} />
      )}
      {rightModal && selectedStore && (
        <RightModal title={"Магазин: " + selectedStore.name} afterClose={() => setSelectedStore(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Загрузка...</p>}>
            <StoreItem store={selectedStore} />
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      )}
    </>
  );
}

export default Stores;
