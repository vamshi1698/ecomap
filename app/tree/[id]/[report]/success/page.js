import { Check } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"
import AnimatedCard from "@/app/components/AnimatedCard"
import ScrollFadePop from "@/app/components/ScrollFadePop"
export default async function successPage() {
    const closeSuccess =async()=>{
        "use server"
        redirect('/')
    }
    return (
        <AnimatedCard >
        <main className="h-screen">
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
                <div className="bg-[#00140F] text-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-[#00FF88]">
                    <div className="flex items-center justify-center mb-4">
                        <Check className="text-[#00FF88]" size={48} />
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-2">Report Submitted</h2>
            <ScrollFadePop>
                        <Image src='/Success-Kid.jpg' width={200} height={200} className="rounded-sm m-2 ml-auto mr-auto" alt="Success-img"/>
            </ScrollFadePop>
                    <p className="text-center text-[#B2DFDB]">
                        Your report has been successfully submitted and will be reviewed shortly.
                    </p>
                    <div className="flex justify-center mt-6">
                        <button onClick={closeSuccess} className="px-6 py-2 bg-[#00FF88] text-black rounded-lg hover:bg-[#00e676] transition duration-200">Close</button>
                    </div>
                </div>
            </div>
        </main>
        </AnimatedCard>
    )
}