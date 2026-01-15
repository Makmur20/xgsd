import Link from "next/link";
import ProductTable from "./product-table";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <div className="max-w-screen-xl px-4 y-16 mt-30 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Product List</h1>
        <Link href="/admin/product/create" className="bg-orange-400 px-6 py-2.5 hover:bg-orange-500 text-white font-bold">Create New</Link>
      </div>
      <Suspense fallback={<p>Loading Data...</p>}>
        <ProductTable/>
      </Suspense>
    </div>
  )
}

export default ProductPage