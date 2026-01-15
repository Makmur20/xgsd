import CreateForm from "../product/create-form";
import { getCategories } from "@/lib/data";

const CreateProductPage = async () => {
    const categories = await getCategories();
    if(!categories) return null;
  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New Product</h1>
        <CreateForm categories={categories} />
    </div>
  )
}

export default CreateProductPage