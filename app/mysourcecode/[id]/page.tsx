import { Metadata } from "next";
import SourceCodeDetail from "@/components/sourcecode-detail";
import { Suspense } from "react";

export const metadata:Metadata ={
    title: "Donation Detail",
}
const MyDonationDetail = async ({
    params,
}: {
    params: Promise<{id: string}>;
}) => {
    const donationId = (await params).id
  return (
    <div className="min-h-screen bg-slate-50">
        <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
            {/* Donation Detail */}
            <Suspense fallback={<p>Loading...</p>}>
                <SourceCodeDetail donationId={donationId} />
            </Suspense>
            
        </div>
    </div>
  )
}

export default MyDonationDetail