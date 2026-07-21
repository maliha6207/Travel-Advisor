import { useState,useEffect,useRef, createRef } from "react"
import Details from "../Details/details"
import { useMediaQuery } from 'react-responsive';
const Lists = ({places,openham,childClicked,isFetching,type,settype,rating,setrating}) => {
  const [elref, setelref] = useState([])
  useEffect(() => {
    if (!places || places.length === 0) return;
    const refs = Array(places.length).fill().map((_,i)=> elref[i] || createRef())
    setelref(refs)
  }, [places])
  
    const isLaptop = useMediaQuery({ query: '(min-width: 600px)' })
  return (

    <div className={` h-[90%] z-10 absolute  overflow-y-scroll bg-[#fdfaf3] text-[#422d2d] transition-all duration-300 w-3/5 lg:static  lg:w-1/3 ${openham?"left-0":"-left-125"}`}>
      {isFetching?<div className="h-full flex justify-center items-center">
        <img className="opacity-75" src="src/assets/loading-3.gif" alt="" />
      </div>:
      <div>
        <h1 className="text-center text-[22px] my-2  lg:my-3 lg:font-bold lg:text-3xl ">Restaurants, Hotels and Attraction around you</h1>
      <div className="gap-2 px-2 w-full flex justify-between flex-col lg:flex-row">
        <select className="border-[#422d2dad] outline-none rounded text-[17px] p-1 border-2 text-center lg:w-[45%]" value={type} onChange={(e) => settype(e.target.value)}>
          <option value="restaurants">Restaurants</option>
          <option value="hotels">Hotels</option>
          <option value="attractions">Attractions</option>
        </select>
        <select className="border-[#422d2dad] outline-none rounded text-[17px] p-1 border-2 text-center lg:w-[45%]" value={rating} onChange={(e) => setrating(e.target.value)}>
          <option value="0">All</option>
          <option value="3">Above 3.0</option>
          <option value="4">Above 4.0</option>
          <option value="5">Above 5.0</option>
        </select>
      </div>
      <div className=" place m-2  lg:py-5">
        {places?.map((place,i)=>(
          <div ref={elref[i]} className="mb-4 card rounded-[7px] drop-shadow-gray-300 drop-shadow  overflow-hidden" key={i} >
            <Details place={place}
            selected={parseInt(childClicked) === i}
            refProp={elref[i]}>
              
            </Details>
          </div>
        ))}
      </div>
      </div>}
    </div>
  )
}

export default Lists
