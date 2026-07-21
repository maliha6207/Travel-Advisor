import React, { useEffect, useRef } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

const Search = ({ setCoordinates }) => {
  const map = useMap();
  const placesLibrary = useMapsLibrary('places'); 
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const element = autocompleteRef.current;
    if (!element) return;

    const handlePlaceSelect = async (event) => {
      const { placePrediction } = event;
      if (!placePrediction) return;
      
      const place = placePrediction.toPlace();

      if (place) {
        await place.fetchFields({ fields: ['location'] });

        if (place.location) {
          const lat = place.location.lat();
          const lng = place.location.lng();

          console.log("📍 Web Component Selected Coordinates:", { lat, lng });

          setCoordinates({ lat, lng });
          
          if (map) {
            map.panTo({ lat, lng });
            map.setZoom(14);
          }
        }
      }
    };

    element.addEventListener('gmp-select', handlePlaceSelect);

    return () => {
      element.removeEventListener('gmp-select', handlePlaceSelect);
    };
  }, [placesLibrary, map, setCoordinates]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const topSuggestion = document.querySelector('.pac-item');
      if (topSuggestion) {
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          bubbles: true
        });
        autocompleteRef.current.dispatchEvent(enterEvent);
      }
    }
  };

  return (
    <form 
      onSubmit={(e) => e.preventDefault()} 
      onKeyDown={handleKeyDown}
      className="flex w-full items-center bg-transparent text-black"
    >
      
      <gmp-place-autocomplete 
        className=" bg-transparent w-full gap-1 outline-0 "
        ref={autocompleteRef}
        placeholder="Search..."
      />
    </form>
  );
};

export default Search;