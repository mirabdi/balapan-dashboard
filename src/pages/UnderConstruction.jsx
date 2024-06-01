// Импортируем React и Tailwind CSS
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useStateContext } from 'contexts/ContextProvider';


const UnderConstruction = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-5 text-5xl font-bold text-gray-800">
          В Разработке
        </h1>
        <p className="mb-5 text-lg text-gray-600">
          Мы работаем над завершением разработки этого сайта. Оставайтесь на связи!
        </p>
        <Button
          color="white"
          bgColor={currentColor}
          text="Вернуться Назад"
          onClick={() => navigate("/")}
          borderRadius="10px"
          className="mb-2"
        />
      </div>
    </div>
  );
};

export default UnderConstruction;
