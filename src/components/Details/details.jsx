

const Details = ({ place,refProp,selected }) => {
  const imageUrl = place?.photo?.images.large.url
  let Rating
  let Ranking
  if (place.rating) {
    Rating = parseInt((place.rating).split(".")[0])
  }
  if (place.ranking) {
    Ranking = (place.ranking).split("R")[0]
  }
  if(selected) refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})

  return (
    <div >
      <img className="object-cover w-full h-25 lg:h-62" src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4Lz2q6Xy50WkxLSt1ifb0Y6TY3fdjsHztXuTg5MDgQ&s=10"} alt="" />
      <div className=" bg-[#fdfaf3] text-[#422d2dc2] flex flex-col gap-1 text-[13px] px-1 py-2 lg:text-[16px] lg:px-2.5 lg:gap-2" >
        <h1 className="text-[#422d2d] font-bold text-[15px] lg:text-[21px]">{place.name}</h1>
        {place.rating ?
          <div className="flex justify-between">
            <div>{Array.from({ length: Rating }).map((_, index) => (
              <span className="text-amber-500" key={index}>★</span>
            ))}</div>
            <p>{place.num_reviews} reviews</p>
          </div> : ""}
        {place.price_level ?
          <div className="price flex justify-between">
            <p>Price Level</p>
            <p>{place.price_level ? place.price_level : "Unknown"}</p>
          </div> : ""}
        {place.ranking ?
          <div className="price flex justify-between">
            <p>Ranking</p>
            <p>{Ranking}</p>
          </div> : ""}
        {place.cuisine?
          <div className="price flex flex-wrap justify-center gap-2 ">
            {place.cuisine.map((c, index) => (
              <button className="py-1 px-1.5 w-fit rounded-[15px] text-[#565555] shadow-2xl bg-[#bdbcbca9] border border-gray-300 lg:px-2.5" key={index}>{c.name || c}</button>
            ))}
          </div> : ""}
        {place.address?
          <div className="price flex justify-between items-start">
            <img className="w-5 grayscale opacity-70" src="src/assets/loc-icon-2.png" alt="" />
            <p className="text-end">{place.address}</p>
          </div> : ""}
        {place.phone?
          <div className="price flex justify-between items-start">
            <img className="w-4.5 grayscale opacity-50" src="src/assets/call-icon.png" alt="" />
            <p >{place.phone}</p>
          </div> : ""}
        <div className="flex justify-center gap-1 transition-all transition-2s active:scale-[0.97] lg:gap-3">
        {place.web_url?
          <button className="bg-[#a6baae] text-[#2e1f1f] rounded-3xl py-1 px-2 lg:px-3 lg:py-2 " onClick={() => window.open(place.web_url, '_blank')}>
            Web Link
          </button> : ""}
        {place.website?
          <button className="bg-[#a6baae] text-[#2e1f1f] rounded-3xl py-1 px-2 lg:px-3 lg:py-2 " onClick={() => window.open(place.website, '_blank')}>
            Website
          </button> : ""}
        </div>


      </div>
    </div>
  )
}

export default Details
