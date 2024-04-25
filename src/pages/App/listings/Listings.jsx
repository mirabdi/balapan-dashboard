import { useState } from 'react';
// import ListingsList from "../../../components/App/listings/ListingsList";
import { Suspense} from 'react';
import { RightModal, ListingsList, ListingItem } from 'components';
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function Listings() {
  let title = "Активные листинги";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedListing, setSelectedListing] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные листинги";
  }
  const { listings } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={listings}>
          {listings => <ListingsList listings={listings} title={title} selectHandler={(listing)=>{setSelectedListing(listing);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedListing &&
        <RightModal title={"Листинг: "+selectedListing.title} afterClose={()=>setSelectedListing(null)}>
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


