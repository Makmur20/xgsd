import EditForm from "./edit-form";
import { getCategories, getProductById } from "@/lib/data";
import { notFound } from "next/navigation";

const EditProduct = async ({productId} : {productId: string}) => {
    const [categories, product] = await Promise.all([getCategories(), getProductById(productId)])
    if(!categories || !product) return notFound();
  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit New product</h1>
        <EditForm categories={categories} product={product} />
    </div>
  )
}

export default EditProduct