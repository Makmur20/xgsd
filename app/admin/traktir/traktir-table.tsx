import { getDonations } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { EditButton } from "@/components/admin/traktir/button";

const TraktirTable = async () => {
    const donations = await getDonations();
    if(!donations?.length) return <p>No Taktir Found</p>
  return (
    <div className='bg-white p-4 mt-5 shadow-sm'>
        <table className='w-full divide-y divide-gray-200'>
            <thead>
                <tr>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>User</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Product Name</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Product Image</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Product Link</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Price</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Status</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {donations.map((donation) => (
                    <tr className='hover:bg-gray-100' key={donation.id}>
                    <td className='px-6 py-4'>{donation.User.name}</td>
                    <td className='px-6 py-4'>{donation.Product.name}</td>
                    <td className='px-6 py-4'>
                        <div className="h-20 w-32 relative">
                            <Image src={donation.Product.image} fill sizes="20vw" alt="room image" className="object-cover" />
                        </div>
                    </td>                        
                    <td className='px-6 py-4'>{donation.Product.link}</td>
                    <td className='px-6 py-4'>{formatCurrency(donation.price)}</td>
                    <td className='px-6 py-4'>{donation.Payment?.status}</td>
                    <td className='px-6 py-4'>{formatDate(donation.createdAt.toString())}</td>
                    <td className='px-6 py-4 text-right'>
                        <div className="flex items-center justify-center gap-1">
                            <EditButton id={donation.id} />
                        </div>
                        </td>
                </tr>
                ))}

            </tbody>
        </table>
    </div>
  )
}

export default TraktirTable