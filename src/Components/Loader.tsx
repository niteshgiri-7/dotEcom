import spinner from "../assests/Loader.svg"
const Loader = () => {
  return (
    <div className="min-h-[80vh] w-full flex justify-center items-center">
      <img src={spinner} alt="loading" className="w-[50px] h-[50px] "/>
    </div>
  )
}

export default Loader;
