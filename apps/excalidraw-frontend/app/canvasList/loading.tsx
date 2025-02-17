export default function Loading (){
    return  <div className=" w-screen h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 items-center">
    {[...Array(6)].map((_, index) => (
       <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden" key={index}>
       <div className="animate-pulse">
         {/* Image placeholder */}
         <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer"></div>
         
         {/* Content area */}
         <div className="p-4 space-y-4">
           {/* Title placeholder */}
           <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
           
           {/* Description placeholders */}
           <div className="space-y-2">
             <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/4"></div>
             <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-5/6"></div>
           </div>
           
           {/* Footer placeholder */}
           <div className="flex justify-between items-center pt-2">
             <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-1/4"></div>
             <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-1/4"></div>
           </div>
         </div>
       </div>
     </div>
    ))}
  </div>
}