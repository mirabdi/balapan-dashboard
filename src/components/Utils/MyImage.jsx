import { useState } from 'react';
import { FaExclamationTriangle  } from 'react-icons/fa'; // Import an icon from react-icons

function MyImage({ src, alt, height = "h-32", width = "w-32", imgClass = "", loadingClass = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && !error &&
        <div className={`${width} ${height} ${loadingClass} bg-gray-200 flex items-center justify-center`}>
          <FaExclamationTriangle  className="text-gray-500" size={32} /> {/* Icon for loading */}
        </div>
      }
      {error &&
        <div className={`${width} ${height} bg-gray-200 flex items-center justify-center`}>
          <FaExclamationTriangle  className="text-gray-500" size={32} /> {/* Icon for error */}
        </div>
      }
      <img
        src={src}
        alt={alt}
        className={`max-${width} max-${height} ${imgClass} ${!loaded || error ? 'hidden' : ''}`}
        onLoad={() => { setLoaded(true); }}
        onError={() => { setError(true); }}
        style={{ transition: 'opacity 0.3s' }}
      />
    </>
  );
}

export default MyImage;
