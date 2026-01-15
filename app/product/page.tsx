import { Metadata } from "next"
import { Suspense } from "react"
import HeaderSection from "@/components/header-section"
import Main from "@/components/main"
import ProductSkeleton from "@/components/skeleton/product-skeleton"

export const metadata:Metadata ={
    title: "Source Code",
    description: "Aplikasi Berbasis Web"
}

export default function ProductPage() {
  return (
    <div>
        <HeaderSection title="Rooms & Rates" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="mt-10 px-4">
            <Suspense fallback={<ProductSkeleton />}>
                <Main/>
            </Suspense>
        </div>
    </div>
  )
}