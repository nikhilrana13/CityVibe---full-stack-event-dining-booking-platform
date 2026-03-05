import { useDialog } from "../../context/useDialog"
import { Link } from "react-router-dom"
import slugify from "slugify"

const SearchResultCard = ({ item }) => {
  const {setIsEventAndDiningOpen} = useDialog()
  const safeSlug = (value) => slugify(value || "", { lower: true, strict: true })
  
   const eventUrl = `/events/${item?._id}/${safeSlug(item?.title)}`
   const diningUrl = `/dining/${safeSlug(item?.city)}/${item?._id}/${safeSlug(item?.name)}`

  return (
    <Link to={item.type === "event" ? eventUrl : diningUrl} onClick={()=>setIsEventAndDiningOpen(false)}>
      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item?.coverimage || item?.images?.[0]}
          alt={item?.title || item?.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col">
        <div className="text-[0.8rem] sm:text-[1rem] font-[500] text-black leading-snug line-clamp-2">
          {item?.title || item?.name}
        </div>
        <span className="text-[0.8rem] sm:text-sm text-gray-500 mt-1 capitalize">
          {item?.type}
        </span>
      </div>
    </div>
    </Link>
  
  )
}

export default SearchResultCard