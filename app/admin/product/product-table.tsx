import { getProducts } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "@/components/admin/product/button";

const ProductTable = async () => {
    const products = await getProducts();
    if(!products?.length) return <p>No Products Found</p>
  return (
    <div className='bg-white p-4 mt-5 shadow-sm'>
        <table className='w-full divide-y divide-gray-200'>
            <thead>
                <tr>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Image</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Product Name</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Product Link</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Price</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left'>Created At</th>
                    <th className='px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase'>Action</th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {products.map((product) => (
                    <tr className='hover:bg-gray-100' key={product.id}>
                    <td className='px-6 py-4'>
                        <div className="h-20 w-32 relative">
                            <Image src={product.image} fill sizes="20vw" alt="room image" className="object-cover" />
                        </div>
                    </td>
                    <td className='px-6 py-4'>{product.name}</td>
                    <td className='px-6 py-4'>{product.link}</td>
                    <td className='px-6 py-4'>{formatCurrency(product.price)}</td>
                    <td className='px-6 py-4'>{formatDate(product.createdAt.toString())}</td>
                    <td className='px-6 py-4 text-right'>
                        <div className="flex items-center justify-center gap-1">
                            <EditButton id={product.id} />
                            <DeleteButton id={product.id} image={product.image}/>
                        </div>
                        </td>
                </tr>
                ))}

            </tbody>
        </table>
    </div>
  )
}

export default ProductTable