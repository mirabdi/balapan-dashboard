import React, {useState} from 'react'
import { AssortmentForm, AssortmentsList, AssortmentSelector, ListingForm, RightModal, ListingsList, Button } from 'components';
import { useRouteLoaderData } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';

const EditAssortment = () => {
  const {assortment} = useRouteLoaderData('assortment-detail');
  const data = useRouteLoaderData('active-assortments-list');
  const [mode, setMode ] = useState(null); 
  console.log(data);
  const { rightModal, setRightModal, showToast, currentColor} = useStateContext();
    return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-8 pt-5">Edit Assortment</h1>
          <AssortmentForm assortment={assortment}/>
          <AssortmentsList title="Related Assortments" assortments={assortment.assortments} selectHandler={(assortment)=>{console.log(assortment); setRightModal(true)}}/>
          <AssortmentSelector assortments={assortments} title="title" selectHandler={()=>console.log('title')}/>
          <Button
                    color="white"
                    bgColor={currentColor}
                    text="+ Ассортимент"
                    onClick={()=>setMode('add_assortment')}
                    borderRadius="10px"
                    className="m-2 font-bold py-2 px-4 rounded"
                />
          <Button
                    color="white"
                    bgColor={currentColor}
                    text="+ Листинг"
                    onClick={()=>setMode('add_listing')}
                    borderRadius="10px"
                    className="m-2 font-bold py-2 px-4 rounded"
                />
          <ListingsList title="Related Listings" listings={assortment.listings} selectHandler={(listing)=>{console.log(listing); setRightModal(true)}}/>
          { 
            mode === 'add_assortment' 
            && <RightModal title={"title"} afterClose={()=>setMode(null)}>
                <AssortmentForm parent_assortment={assortment}/>
              </RightModal>
          }
          { 
            mode === 'add_listing' 
            &&
              <RightModal title={"title"} afterClose={()=>setMode(null)}>
                <ListingForm parent_assortment={assortment}/>
              </RightModal>
          }
        </div>
    );
}

export default EditAssortment