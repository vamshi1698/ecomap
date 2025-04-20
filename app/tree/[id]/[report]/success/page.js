import { Check } from "lucide-react"
export default async function successPage({ params }) {
    return (
        <main className="h-screen">
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
                <div className="bg-[#00140F] text-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-[#00FF88]">
                    <div className="flex items-center justify-center mb-4">
                        <Check className="text-[#00FF88]" size={48} />
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-2">Report Submitted</h2>
                    <p className="text-center text-[#B2DFDB]">
                        Your report has been successfully submitted and will be reviewed shortly.
                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-2 bg-[#00FF88] text-black rounded-lg hover:bg-[#00e676] transition duration-200">Close</button>
                    </div>
                </div>
            </div>

        </main>
    )
}