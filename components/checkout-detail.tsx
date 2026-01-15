import Image from "next/image";
import { getProductDonationById } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import PaymentButton from "./payment-button";

const CheckoutDetail = async ({donationId}: {donationId: string}) => {
    const donation = await getProductDonationById(donationId);
    if(!donation || !donation.Payment) return <h1>Tidak Ada Data Traktiran</h1>

  return (
    <div className="grid md:grid-cols-2 gap-5">
        <div className="order-2">
            <div className="flex flex-col mb-3 items-start bg-white border border-gray-200 rounded-sm md:flex-row md:w-full">
                <div className="aspect-video relative">
                    <Image src={donation.Product.image} width={500} height={300} 
                    className="object-cover w-full rounded-t-sm aspect-video md:rounded-none md:rounded-s-sm m-3" alt="image"/>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                        {donation.Product.name}</h5>
                        <div className="flex items-center gap-1 text-2xl text-gray-700">
                            <div className="flex items-center justify-center gap-1">
                            <span className="text-2xl">
                                {formatCurrency(donation.price)}
                            </span>
                            <span>/ Cup</span>
                        </div> 
                    </div>
                </div>
            </div>
        {/* Payment Button */}
        <PaymentButton donation={donation}/>
        </div>
            
        <div className="border border-gray-200 px-3 py-5 bg-white rounded-sm">
            <table className="w-full">
                <tbody>
                    <tr>
                        <td className="py-2">Traktir ID</td>
                        <td className="py-2 text-right truncate">{donation.id}</td>
                    </tr>
                    
                    <tr>
                        <td className="py-2">Name</td>
                        <td className="py-2 text-right truncate">{donation.User.name}</td>
                    </tr>
                    
                    <tr>
                        <td className="py-2">Email</td>
                        <td className="py-2 text-right truncate">{donation.User.email}</td>
                    </tr>
                    
                    <tr>
                        <td className="py-2">Phone</td>
                        <td className="py-2 text-right truncate">{donation.User.phone}</td>
                    </tr>

                    <tr>
                        <td className="py-2">Amount In Rupiah</td>
                        <td className="py-2 text-right truncate">
                            <span>
                                {formatCurrency(donation.Payment.amount)}
                            </span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="py-2">Amount In Rupiah</td>
                        <td className="py-2 text-right truncate">
                            <span>
                                {donation.Payment.status}
                            </span>
                        </td>
                    </tr>                                            
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default CheckoutDetail