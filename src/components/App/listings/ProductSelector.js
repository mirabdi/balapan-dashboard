import React, { useState, useEffect } from 'react'
import { Button } from 'components'
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';

const ProductSelector = ({product, onSelect}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);
  
  const [barcodeOrTitle, setBarcodeOrTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast, currentColor } = useStateContext();

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/crm/admin-api/listings/get-product?query=${barcodeOrTitle}`, {
        method: 'GET',
        headers: {
          Authorization: 'Token token',
        },
      });
      const data = await response.json();
      if (response.ok) {
        onSelect(data);
        showToast({ title: 'Product Loaded', content: 'The product details have been loaded.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      } else {
        throw new Error(data.message || 'Failed to load product.');
      }
    } catch (error) {
      showToast({ title: 'Error', content: error.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    } finally {
      setLoading(false);
    }
  };
  console.log("product selector:", selectedProduct);
  return (
    selectedProduct 
      ?  <div className="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8 ">
          <div className="md:flex" >
            <div className="p-8">
              <div className="text-lg leading-tight font-medium text-black mt-2">
                <p className="uppercase tracking-wide text-xl font-bold" style={{ color: currentColor }}>Выбранный товар:</p>
                <span className="uppercase tracking-wide text-lg font-semibold" style={{ color: currentColor }}> {selectedProduct.name}</span>
              </div>
              <p className="mt-1 text-gray-500">{selectedProduct.description || "Описание недоступно."}</p>
              <div className="mt-4">
                <div className="text-gray-600">Штрих-код: {selectedProduct.barcode}</div>
                <div className="text-gray-600">Цена: {selectedProduct.price} руб.</div>
                <div className="text-gray-600">Себестоимость: {selectedProduct.cost} руб.</div>
              </div>
              <Button
                color="white"
                bgColor={currentColor}
                text={'Изменить'}
                onClick={() => onSelect(null)}
                borderRadius="10px"
                className="m-2"
              />
            </div>
          </div>
        </div>
      :
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Barcode or Title</label>
          <input
            type="text"
            value={barcodeOrTitle}
            onChange={(e) => setBarcodeOrTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Barcode or Title"
          />
          <Button
            color="white"
            bgColor={currentColor}
            disabled={loading}
            text={loading ? 'Loading...' : 'Load Product'}
            type="submit"
            onClick={loadProduct}
            borderRadius="10px"
            className="m-2"
          />
        </div>
  )
}

export default ProductSelector