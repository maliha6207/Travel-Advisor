
import Search from '../Search/search';
const Header = ({ setopenham,setCoordinates }) => {
  const setham = () => {
    setopenham((prev) => !prev);
  }
  return (
    <div className="text-[18px] items-center flex justify-between w-full h-12.5 bg-[#a6baae] text-[#422d2d] px-2 lg:h-15">
      <div className="flex items-center gap-1.5">
        <img onClick={setham} className="h-6 w-6.5 opacity-70 lg:hidden" src="src/assets/ham-icon.png" alt="" />
        <h1 className="text-[20px] italic font-bold lg:text-[28px]">Traisor</h1>
      </div>
      <div className="flex items-center justify-end gap-2 w-[70%] lg:w-[40%]">
        <p className="hidden md:block ">Explore new places:</p>
        <div className="w-2/3 gap-2 px-2 rounded-[10px] h-9.75 bg-[#bccbc2] flex items-center justify-center">
        <Search setCoordinates={setCoordinates}></Search>
        </div>
      </div>
    </div>
  )
}

export default Header
