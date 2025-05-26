import { redirect } from "next/navigation"
import ScrollFadePop from "@/app/components/ScrollFadePop";
export default async function ReportPage({params,searchParams}) {
    const {id,report} =await params
    const {location} = await searchParams
    async function handleSubmit(formData) {
        "use server"
        const data = {
            location_id : id,
            tree_id : report,
            issue_type :formData.get('issue-type'),
            description :formData.get('description'),
            reported_at : new Date().toLocaleString()
        }
        const res =await fetch(`${NEXTAUTH_URL}/api/tree/${id}/${report}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if(res){
            redirect(`/tree/${id}/${report}/success`)
        }
    }
    return(
            <ScrollFadePop >
        <main className="h-[100dvh] flex items-center align-middle justify-center overflow-hidden ">
            <form action={handleSubmit} className="flex sm:max-w-[500px] mt-5 m-auto flex-col bg-[#0D1C1C] text-[#E0F2F1] p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-[#00E676]">Report Issue on {report} at {location}</h2>
                <label htmlFor="issue-type" className="mt-4 block mb-2 text-[#B2DFDB]">Issue Type</label>
                <select name="issue-type" className="focus:outline-0 w-full bg-[#122222] text-[#E0F2F1] p-2 rounded mb-4 outline-none border border-[#1A2E2E]" id="issue-type" required>
                    <option value="Damage">Damage</option>
                    <option value="Disease">Disease</option>
                    <option value="Safety Hazard">Safety Hazard</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="description" className="mt-4 block mb-2 text-[#B2DFDB] ">Description</label>
                <textarea name="description" required id="description" className="resize-none w-full h-32 bg-[#122222] text-[#E0F2F1] placeholder-[#B2DFDB] p-2 rounded outline-none border border-[#1A2E2E] " cols="30" rows="10"></textarea>
                <button type="submit" className="mt-4 w-full bg-[#00E676] text-black font-semibold py-2 rounded hover:bg-[#1DE9B6] transition">Submit Report</button>
            </form>
        </main>
            </ScrollFadePop >
    )
}