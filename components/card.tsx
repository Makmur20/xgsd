import Image from "next/image"
import Link from "next/link"
import { Product } from "@prisma/client"

const Card = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden 
                    transition hover:shadow-md">

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="p-2 bg-gray-100">
          <div className="relative h-[200px] rounded-sm overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Nama Produk */}
        <h3 className="text-sm line-clamp-2 min-h-[40px] font-bold">
          <Link
            href={`/product/${product.id}`}
            className="hover:text-orange-500"
          >
            {product.name}
          </Link>
        </h3>

        {/* Harga */}
        <p className="text-orange-500 font-bold text-lg">
          Rp {product.price?.toLocaleString("id-ID")}
        </p>

        {/* Info tambahan */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span></span>
          <span>10 Traktiran</span>
        </div>

        {/* Button */}
        <Link
          href={`/product/${product.id}`}
          className="block text-center text-sm font-semibold
                     border border-orange-500 text-orange-500
                     py-1.5 rounded-sm
                     hover:bg-orange-500 hover:text-white transition"
        >
          Trakteer
        </Link>
      </div>
    </div>
  )
}


export default Card