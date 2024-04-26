import { useState } from 'react';
 
function MyImage({ src, alt, height="h-32", width="w-32", imgClass = "", loadingClass = ""}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded &&
        <div className={`${width} ${height} ${loadingClass} bg-gray-200`}></div>
      }
        <img
            src={src}
            alt={alt}
            className={`max-${width} max-${height} ${imgClass} ${!loaded ? 'hidden' : ''}`}
            onLoad={() => {setLoaded(true)}}
            style={{ transition: 'opacity 0.3s' }}
        />
      
    </>
  );
}

export default MyImage;