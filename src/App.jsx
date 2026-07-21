import Header from "./components/Header/header"
import Lists from "./components/Lists/lists"
import WholeMap from "./components/WholeMap/wholemap"
import {getPlacesData} from './api/index'
import {useState, useEffect,useRef } from "react"
import { APIProvider } from '@vis.gl/react-google-maps';


// from 2/7/2026 to 11/7/2026
// missed 3,4,8
// 15 hours 50 min
function App() {
  const [places, setplaces] = useState([])
  const [openham, setopenham] = useState(false)
  const [bounds, setBounds] = useState(null);
  const [childClicked, setchildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({lat:0,lng:0});
  const [isFetching, setisFetching] = useState(false)
  const totalCallsMade = useRef(0);
  const [type, settype] = useState("restaurants")
  const [rating, setrating] = useState('')
  const [filteredPlaces, setfilteredPlaces] = useState([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        setCoordinates({lat:latitude,lng:longitude})
    })
  }, [])
  useEffect(() => {
   if (!rating || rating === "0" || rating === "") {
    setfilteredPlaces(places);
  } else {
    const filtered = places?.filter((place) => {
      if (!place.rating) return false; 
      
      return Number(place.rating) >= Number(rating);
    });

    setfilteredPlaces(filtered);
  }
  }, [rating])
  
  
  useEffect(() => {
    if (!bounds || !bounds.sw || !bounds.ne || isFetching.current) return;
    if (totalCallsMade.current >= 5) {
      console.warn("🛑 EMERGENCY BRAKE: Blocked API call to prevent a 429 rate-limit ban.");
      return;
    }
    const fetchData = async () => {
      try {
        setisFetching(true)
        console.log("🚀 Making ONE controlled API call..."); 
        
        const data = await getPlacesData(type, bounds.sw,bounds.ne);
        
        if (data) {
          setplaces(data);
          setfilteredPlaces([])
        }
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setisFetching(false) 
      }
    };
    fetchData();
  }, [type,coordinates,bounds])
  
  
  return (
    <APIProvider  apiKey={import.meta.env.VITE_GOOGLE_CLOUD_DEMO_API_KEY}version="beta">
    <div className="overflow-hidden h-screen">
      <Header setopenham={setopenham} setCoordinates={setCoordinates}></Header>
      <div className="flex overflow-hidden h-full">
          <Lists places={filteredPlaces.length? filteredPlaces: places} openham={openham} 
          childClicked={childClicked}
          isFetching={isFetching}
          type={type}
          settype={settype}
          rating={rating}
          setrating={setrating}
          ></Lists>
          <WholeMap setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length? filteredPlaces: places}
          setchildClicked={setchildClicked}></WholeMap> 
      </div>
    </div>
    </APIProvider>
  )
}

export default App
