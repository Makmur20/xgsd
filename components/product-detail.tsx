import Image from "next/image";
import { getProductDetailById } from "@/lib/data";
import { IoCheckmark } from "react-icons/io5";
import DOMPurify from "isomorphic-dompurify";
import DonateForm from "./donate-form";
import { notFound } from "next/navigation";

const ProductDetail = async ({ productId }: { productId: string }) => {
  const product = await getProductDetailById(productId);

  if (!product) {
    notFound(); // ⬅️ WAJIB
  }

  return (
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
      <div className="md:col-span-8">
        <Image
          src={product.image}
          alt={product.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-sm mb-8"
        />

        <h1 className="text-5xl font-semibold text-gray-900 mb-8">
          {product.name}
        </h1>

        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          />
        </div>

        <h5 className="text-lg font-bold py-4">Kategori:</h5>
        <div className="grid md:grid-cols-3 gap-2">
          {product.ProductCategories.map((item) => (
            <div className="flex gap-1 items-center" key={item.id}>
              <IoCheckmark className="size-5 text-green-600" />
              <span>{item.Categories.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-4">
        <div className="border-2 border-dashed border-gray-300 p-4 bg-slate-50 rounded-md">
          <DonateForm product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
