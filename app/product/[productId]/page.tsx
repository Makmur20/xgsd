import { Metadata } from "next";
import ProductDetail from "@/components/product-detail";
import { Suspense } from "react";

export const metadata:Metadata ={
    title: "Product Detail"
}
const ProductDetailPage = async ({
    params
}:{
    params: Promise<{productId: string}>
}) => {
    const productId = (await params).productId;
  return (
    <div className="mt-16">
        <Suspense fallback={<p>Loading...</p>} >
            <ProductDetail productId={productId}/>
        </Suspense>
    </div>
  )
}

export default ProductDetailPage