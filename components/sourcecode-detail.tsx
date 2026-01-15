import { getProductSourceCodeById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { notFound } from "next/navigation";;


const SourceCodeDetail = async ({donationId}: {donationId: string}) => {

    const donation = await getProductSourceCodeById(donationId);
    if(!donation) return notFound();
  return (
    <div className='w-full p-4 bg-white border border-gray-200 rounded-sm shadow'>
        <div className="grid md:grid-cols-2 md:gap-5">
            <ul>
                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Trakter ID</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">#{donation.id}</div>
                    </div>
                </li>

                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Trakter Date</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{formatDate(donation.createdAt.toISOString())}</div>
                    </div>
                </li>

                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Name</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{donation.User.name}</div>
                    </div>
                </li>

                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Email</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">#{donation.User.email}</div>   
                    </div>
                </li>
            </ul>

            <ul>
                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Phone</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{donation.User.phone}</div>
                    </div>
                </li>

                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Payment Methode</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 capitalize">{donation.Payment?.methode? donation.Payment.methode.replace("_"," "): null}</div>
                    </div>
                </li>

                <li className='py-2'>
                    <div className="flex items-center">
                        <div className="flex-1 min-w-0 ms-4">
                            <p className='text-sm font-medium text-gray-900 truncate'>Payment Status</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">{donation.Payment?.status}</div>
                    </div>
                </li>                
            </ul>
        </div>
        {/* table */}
        <div className="relative overflow-x-auto mt-3 py-6">
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3'>Source Code</th>
                        <th className='px-6 py-3 min-w-60 md:min-w-0'>Trakter Date</th>
                        <th className='px-6 py-3'>Link Source Code</th>
                        <th className='px-6 py-3'>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b'>
                        <td className='px-6 py-4'>
                            <div className="flex flex-col">
                                <span className='font-medium text-gray-900 whitespace-nowrap'>{donation.Product.name}</span>
                                <span>Price: {formatCurrency(donation.price)}</span>
                            </div>
                        </td>
                        <td className='px-6 py-4 text-right'>{formatDate(donation.createdAt.toISOString())}</td>
                        <td className="px-6 py-4 text-right">
                            {donation.Product.link ? (
                                <a
                                href={donation.Product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                >
                                Kunjungi
                                </a>
                            ) : (
                                <span className="text-gray-400">Tidak ada link</span>
                            )}
                        </td>

                        <td className='px-6 py-4 text-right'>{donation.Payment && formatCurrency(donation.Payment.amount)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className='px-6 py-3 font-bold' colSpan={2}>Total</td>
                        <td className='px-6 py-3 font-bold text-right' colSpan={3}>{donation.Payment && formatCurrency(donation.Payment.amount)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  )
}

export default SourceCodeDetail