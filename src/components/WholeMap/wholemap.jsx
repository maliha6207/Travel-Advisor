import {  Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useMediaQuery } from 'react-responsive';

const WholeMap = ({ setCoordinates, setBounds, coordinates, places,setchildClicked }) => {
  const isLaptop = useMediaQuery({ query: '(min-width: 600px)' })
  const defaultCenter = { lat: 22.8456, lng: 89.5403 };
  const HandleCameraChange = (e) => {
    const mapInstance = e.detail
    if (!mapInstance) return;
    setCoordinates({ lat: mapInstance.center.lat, lng: mapInstance.center.lng })

    const bounds = mapInstance.bounds;
    if (bounds) {
      const newBounds = {
        ne: { lat: bounds.north, lng: bounds.east },
        sw: { lat: bounds.south, lng: bounds.west }
      };
      console.log("🗺️ MAP COMPONENT: Setting new bounds state!", newBounds);
      setBounds(newBounds)
    }
  }
  return (
      <div style={{ height: '100%', width: '100%' }}>
        <Map
          defaultZoom={14}
          defaultCenter={defaultCenter}
          mapId="YOUR_MAP_ID"
          gestureHandling="greedy"
          onCameraChanged={HandleCameraChange}
        >
          {places?.map((place, i) => {
            if (!place.latitude || !place.longitude) return null;
            return (
              <AdvancedMarker
                key={i}
                position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                onClick={() => setchildClicked(i)}
              >
                {isLaptop ? (
                  <div className="custom-map-card bg-[#fdfaf3] border-[#422d2d7e] border-3 text-center flex flex-col   rounded-[10px] overflow-hidden pt-1 w-25 lg:w-35">
                    <p>{place.name}</p>
                    <img className='mt-2 w-full h-12.5 object-cover lg:h-15.5'
                      src={place.photo ? place.photo.images.large.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4Lz2q6Xy50WkxLSt1ifb0Y6TY3fdjsHztXuTg5MDgQ&s=10"}
                      alt={place.name}
                    />
                    <div>
                      {place.rating ?
                          (Array.from({ length: parseInt((place.rating).split(".")[0]) }).map((_, index) => (
                            <span className="text-amber-500 mb-2" key={index}>★</span>
                          ))): ""}
                    </div>
                  </div>
                ) : (
                  <img className='w-[75%] cursor-pointer' src="src/assets/loc-icon-2.png" alt="" />
                )}
              </AdvancedMarker>
            );
          })}
        </Map>
      </div>
  );
};

export default WholeMap;