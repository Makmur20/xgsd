import Image from "next/image";
import { getSourceCodeByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";


const MyReserveList = async () => {
    const sourcecode = await getSourceCodeByUserId();
    if(!sourcecode) return notFound();    
  return (
    <div>
        {sourcecode.map((item)=> (
            <div className="bg-white shadow pb-4 mb-04 md:pb-0 relative" key={item.id}>
            <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-t-sm">
                <h1 className='text-sm font-medium text-gray-900 truncate'>TRAKTIR ID: #{item.id}</h1>
                <div className="flex gap-1 px-3 py-2 text-sm font-normal">
                    <span>Status:</span>
                    <span className='font-bold uppercase'>{item.Payment?.status}</span>
                </div>
            </div>
            <div className="flex flex-col mb-4 items-start bg-white rounded-sm md:flex-row md:w-full">
                <Image src={item.Product.image} width={500} height={300} className="object-cover w-full rounded-t-sm h-60 md:h-auto
                md:w-1/3 md:rounded-none md:rounded-s-sm" alt="image room" />
                <div className="flex items-center gap-1 mb-3 px-2 font-normal text-gray-700 w-full">
                    <div className="w-full">
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>HARGA</span>
                            <span>{formatCurrency(item.price)}</span>
                        </div>
                          
                        <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                            <span>Subtotal</span>
                            <span>{item.Payment && formatCurrency(item.Payment.amount)}</span>
                        </div>                                                
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end absolute inset-4">
                {item.Payment?.status === "unpaid" ? (
                    <Link href={`/checkout/${item.id}`} className="px-6 py-1 bg-orange-400 text-white
                    rounded-md hover:bg-orange-500">TRAKTIR SEKARANG</Link>
                ):(
                    <Link href={`/mysourcecode/${item.id}`} className="px-6 py-1 bg-orange-400 text-white
                    rounded-md hover:bg-orange-500">Lihat Detail</Link>
                )}
            </div> 
        </div> 
        ))}

    </div>
  )
}

export default MyReserveList