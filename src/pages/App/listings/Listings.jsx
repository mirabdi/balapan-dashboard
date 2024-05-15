import { useEffect, useState, useRef } from 'react';
import { Suspense } from 'react';
import { RightModal, ListingsList, ListingItem } from 'components';
import { Await } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from 'data/config';

function Listings({ status }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const { rightModal, setRightModal, showToast, token } = useStateContext();
  
  const getTitle = (status) => {
    switch (status) {
      case 'archived': return 'Архивные листинги';
      case 'active': 
      default: return 'Активные листинги';
    }
  };
  const title = getTitle(status);

  const loadListings = async (status = 'active', token, page = 1, query = "") => {
    let url = `${BASE_URL}/crm/admin-api/listings?status=${status}&page=${page}&query=${query}`;
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
        let message = 'Failed to load listings';
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
      showToast({ title: 'Error!', content: error.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreListings = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedListings = await loadListings(status, token, nextPage, query);
    if (Array.isArray(loadedListings)) {
      setListings((prev) => [...prev, ...loadedListings]);
    } else {
      console.error('Loaded listings is not an array:', loadedListings);
    }
  };

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);  // Reset to the first page for a new search
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedListings = await loadListings(status, token, 1, newQuery);
      setListings(loadedListings);
    }, 2000);
  };

  useEffect(() => {
    if (token) {
      loadListings(status, token, 1, "").then(loadedListings => setListings(loadedListings));
    }
  }, [status, token]);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            className="search-input float-right mb-4 p-2 border rounded-lg shadow-md"
          />
          <ListingsList 
            listings={listings} 
            title={title} 
            selectHandler={(listing) => {
              setSelectedListing(listing);  
              setRightModal(true);
            }}
          />
          <button onClick={loadMoreListings} className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </>
      </Suspense>
      {rightModal && selectedListing &&
        <RightModal title={"Листинг: " + selectedListing.title} afterClose={() => setSelectedListing(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedListing}>
              {(loadedListing) => <ListingItem listing={loadedListing} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      }
    </>
  );
}

export default Listings;
