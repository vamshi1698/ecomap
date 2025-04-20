import Link from "next/link"
export default async function Streets({streets}){
    return(
        <ul className="sm:p-3 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 rounded-2xl">
            {
              streets && streets.map((street)=>(
                <div key={street._id} className="street border-[#1E2E2E] text-[#E0F2F1] border-1 hover:scale-[1.02] transition-all bg-[#122222] gap-5 flex flex-col sm:rounded-xl sm:p-5 p-1 rounded-md mb-5">
                  <div className="img w-full overflow-hidden">
                    <img src={street.street_img} alt="Street Image" className="w-full md:rounded-2xl rounded-sm aspect-video object-cover" />
                  </div>
                  <div className="location_name">
                    <span className="text-[#80CBC4] p-1 mr-2">Location Name :</span><span>{street.location_name}</span>
                  </div>
                  <div className="no_of_trees">
                    <span className="text-[#80CBC4] p-1 mr-2">No of trees :</span><span>{street.no_of_trees}</span>
                  </div>
                  <div className="address">
                    <span className="text-[#80CBC4] p-1 mr-2">Address :</span><span>{street.address}</span>
                  </div>
                  <Link href={`/tree/${street.location_id}`} className="bg-[#00E676] hover:bg-[#1DE9B6] text-[#000] text-center p-1 rounded-2xl">View more</Link>
                </div>  
              ))
            }
        </ul>
    )
}