import { Suspense, useEffect, useState, useRef } from "react";
import { useStateContext } from "contexts/ContextProvider";
import { MyImage } from "components";
import { Button } from 'components';
import { BASE_URL } from "data/config";

function ListingSelector({ parent_assortment, title, afterAction }) {
  const [listings, setListings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const { showToast, token, currentColor } = useStateContext();

  const loadListings = async (parent_id, token, page = 1, query = "") => {
    let url = `${BASE_URL}/crm/admin-api/listings?parent_id=${parent_id}&page=${page}&query=${query}`;
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
        let message = "Failed to load listings";
        try {
          const resData = await response.json();
          message = resData.message;
        } catch (error) {
          console.error("Failed to parse error message:", error);
        }
        throw new Error(message);
      }
      const resData = await response.json();
      return resData.response;
    } catch (error) {
      showToast({
        title: "Error!",
        content: error.message,
        cssClass: "e-toast-danger",
        icon: "e-error toast-icons",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreListings = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedListings = await loadListings(parent_assortment.id, token, nextPage, query);
    if (Array.isArray(loadedListings)) {
      setListings((prev) => [...prev, ...loadedListings]);
    } else {
      console.error("Loaded listings is not an array:", loadedListings);
    }
  };

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedListings = await loadListings(parent_assortment.id, token, 1, newQuery);
      setListings(loadedListings);
    }, 2000);
  };

  useEffect(() => {
    const fetchListings = async () => {
      const loadedListings = await loadListings(parent_assortment.id, token, 1, "");
      setListings(loadedListings);
    };
    fetchListings();
  }, [parent_assortment, token]);

  const handleCheckboxChange = (listingId) => {
    setListings(prev => prev.map(item => 
      item.id === listingId ? { ...item, included: !item.included } : item
    ));
  };

  const localCancelHandler = () => {
    const result = window.confirm('Вы уверены, что хотите отменить изменения? Все несохраненные данные будут потеряны.');
    if (result) {
      afterAction();
    }
  };

  const saveChanges = async () => {
    const result = window.confirm('Вы уверены, что хотите сохранить изменения?');
    if (!result) return;
    try {
      let url = `${BASE_URL}/crm/admin-api/assortments/${parent_assortment.id}/edit`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ listings: listings })
      });
      if (response.ok) {
        showToast({ title: 'Success!', content: 'All changes saved successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
        afterAction();
      } else {
        const errorData = await response.json();
        showToast({ title: 'Failed to save!', content: errorData.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    } catch (error) {
      showToast({ title: 'Error!', content: error.toString(), cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    }
  };

  return (
    <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
      <div className="bg-white py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
        
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            className="search-input p-2 border rounded-lg shadow-md"
          />
          <button
            onClick={loadMoreListings}
            className="load-more-button p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Загрузить еще"}
          </button>
        </div>

        <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ИКОНКА</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  onClick={() => handleCheckboxChange(listing.id)}
                  className={`${
                    listing.included ? 'bg-blue-100' : 'bg-white'
                  } hover:bg-blue-200 cursor-pointer transition duration-150 ease-in-out select-none`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                    <input
                      type="checkbox"
                      checked={listing.included}
                      onChange={(event) => {
                        event.stopPropagation();
                        handleCheckboxChange(listing.id);
                      }}
                      className="checked:bg-blue-500 checked:border-transparent focus:outline-none"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700 overflow-hidden text-overflow-ellipsis max-w-xs" title={listing.title}>
                    {listing.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                    <MyImage src={listing.image_url} alt={listing.title} height="h-32" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button type="button" onClick={localCancelHandler} disabled={isSubmitting} className='mr-3'>
            Cancel
          </button>
          <Button
            color="white"
            bgColor={currentColor}
            disabled={isSubmitting}
            text={isSubmitting ? 'Submitting...' : 'Save'}
            type="button"
            onClick={saveChanges}
            borderRadius="10px"
            className="m-2"
          />
        </div>
      </div>
    </Suspense>
  );
}

export default ListingSelector;
