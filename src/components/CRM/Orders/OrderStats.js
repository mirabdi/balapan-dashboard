import React from 'react'

const OrderStats = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-lg">
        <p className="text-green-800">Оформлен</p>
        <p className="font-bold text-lg">1,046</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
        <p className="text-yellow-800">Сборка</p>
        <p className="font-bold text-lg">159</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
        <p className="text-purple-800">Готов</p>
        <p className="font-bold text-lg">624</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
        <p className="text-blue-800">Доставка</p>
        <p className="font-bold text-lg">263</p>
        </div>
    </div>
  )
}

export default OrderStats