import { useState } from 'react';


const SearchInput = ({ onSearch }) => {
    const [input, setInput] = useState('');
  
    const handleSearch = () => {
      onSearch(input);
    };
  
    return (
      <div className="flex justify-start mb-4">
        <input
          type="text"
          placeholder="Поиск..."
          className="px-4 py-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Поиск
        </button>
      </div>
    );
  };

export default SearchInput;