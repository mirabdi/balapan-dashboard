import { useState } from 'react';
// import BannersList from "../../../components/App/banners/BannersList";
import { Suspense} from 'react';
import { RightModal, BannersList, BannerItem } from "../../../components";
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function Banners() {
  let title = "Активные баннеры";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedBanner, setSelectedBanner] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Архивные баннеры";
  }
  const { banners } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={banners}>
          {banners => <BannersList banners={banners} title={title} selectHandler={(banner)=>{setSelectedBanner(banner);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedBanner &&
        <RightModal title={"Пост: "+selectedBanner.title} afterClose={()=>setSelectedBanner(null)}>
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


