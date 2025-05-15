import AnimatedCard from "@/app/components/AnimatedCard";
import { TriangleAlert } from "lucide-react";
import ScrollFadePop from "@/app/components/ScrollFadePop";
import Image  from "next/image"
import Link from "next/link";
export default async function TreePage({ params}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/tree/${id}`, {
    cache: 'no-store'
  });
  const streetRes = await fetch(`http://localhost:3000/api/street/${id}`, {
    cache: 'no-store'
  });
  const street = await streetRes.json()
  if (!res.ok) {
    console.error("Tree not found or server error:", res);
    return <div>Tree not found</div>;
  }

  const trees = await res.json();
  return (
    <main className=" m-auto lg:h-screen p-0  ">
      <div className="rounded-xl lg:grid p-5 lg:grid-cols-[repeat(2,1fr)]  text-center mt-3">
      <ScrollFadePop >            
      <div className="street border-[#1E2E2E] text-[#E0F2F1] text-start m-auto max-w-[650px] border-1 transition-all bg-[#122222] gap-5 flex flex-col sm:rounded-xl sm:p-5 p-1 rounded-md">
                  <div className="img relative w-full md:h-[400px] h-[200px] overflow-hidden">
                    <Image src={street.street_img} alt="Street Image" fill className="w-full md:rounded-2xl rounded-sm aspect-video object-cover" />
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
                </div>
          </ScrollFadePop>
        <ul className=" pb-0.5 font-mono scroll-auto h-[570px] hide-scrollbar overflow-y-auto">
          {trees.map((tree) => (
            <AnimatedCard key={tree._id}>
            <div className="tree m-1 border-2 rounded border-[#374151] text-[#f3f4f6] shadow-[0_4px_10px_rgba(0,0,0,0.2)] bg-[#1e2a38] p-1 sm:p-5 sm:pt-3 sm:pb-3" key={tree._id}>
              <div className="inner-tree mb-4 flex justify-between items-center">
                <div className="name font-bold flex gap-3">
                  <span className="">Tree</span>
                  <span className="">#{tree.tree_id}</span>
                </div>
                <div className="extra flex gap-3.5 items-center">
                  <span className={`p-2 rounded-full text-[black] ${tree.tree_status === "at risk" ? 'bg-[#e74c3c]' : tree.tree_status === 'healthy'? "bg-green-400": "bg-[#f1c40f]"}`}>{tree.tree_status}</span>
                  <Link href={`/tree/${id}/${tree.tree_id}?location=${street.location_name}`}><TriangleAlert color="red" /></Link>
                </div>
              </div>
              <div className="details grid text-start sm:grid-cols-2">
                <div className="name">
                  <span>Spicies : </span><span>{tree.tree_name}</span>
                </div>
                <div className="height">
                  <span>Height : </span><span>{tree.tree_height_meters}</span>
                </div>
                <div className="age">
                  <span>Age : </span><span>{tree.tree_age_years}</span>
                </div>  
                <div className="health">
                  <span>Tree Health : </span><span>{tree.tree_health}</span>
                </div>
              </div>
            </div>
            </AnimatedCard>
          ))}
        </ul>
      </div>
    </main>
  );
}
