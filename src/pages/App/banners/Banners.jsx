import { useEffect, useState, useRef } from 'react';
import { Suspense } from 'react';
import { RightModal, BannersList, BannerItem } from "../../../components";
import { Await } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from 'data/config';

function Banners({ status = 'active' }) {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [banners, setBanners] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const { rightModal, setRightModal, showToast, token } = useStateContext();

  const getTitle = (status) => {
    switch (status) {
      case 'archived': return 'Архивные баннеры';
      case 'active':
      default: return 'Активные баннеры';
    }
  };
  const title = getTitle(status);

  const loadBanners = async (status = 'active', token, page = 1, query = "") => {
    let url = `${BASE_URL}/crm/admin-api/banners?status=${status}&page=${page}&query=${query}`;
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
        let message = 'Failed to load banners';
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

  const loadMoreBanners = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedBanners = await loadBanners(status, token, nextPage, query);
    if (Array.isArray(loadedBanners)) {
      setBanners((prev) => [...prev, ...loadedBanners]);
    } else {
      console.error('Loaded banners is not an array:', loadedBanners);
    }
  };

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);  // Reset to the first page for a new search
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedBanners = await loadBanners(status, token, 1, newQuery);
      setBanners(loadedBanners);
    }, 2000);
  };

  useEffect(async () => {
    if (token) {
      const loadedBanners = await loadBanners(status, token, 1, "");
      setBanners(loadedBanners);
    }
  }, [status, token]);

  console.log("Banners:", banners)
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
          <BannersList 
            banners={banners} 
            title={title} 
            selectHandler={(banner) => {
              setSelectedBanner(banner);  
              setRightModal(true);
            }}
          />
          <button onClick={loadMoreBanners} className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </>
      </Suspense>
      {rightModal && selectedBanner &&
        <RightModal title={"Баннер: " + selectedBanner.title} afterClose={() => setSelectedBanner(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedBanner}>
              {(loadedBanner) => <BannerItem banner={loadedBanner} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      }
    </>
  );
}

export default Banners;
