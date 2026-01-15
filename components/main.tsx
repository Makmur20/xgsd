import Card from "./card"
import { getProducts } from "@/lib/data"
import { notFound } from "next/navigation"

const Main = async () => {
  const products = await getProducts();
  if (!products) return notFound();
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
        <div className="grid gap-7 md:grid-cols-3">
          {products.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </div>
    </div>
  )
}

export default Main