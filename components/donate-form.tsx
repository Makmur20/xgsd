"use client";

import { useActionState } from "react";
import { createDonation } from "@/lib/actions";
import { ProductDetailProps } from "@/types/product";
import Image from "next/image";
import clsx from "clsx";

const products = [
  {
    id: "kopi1",
    name: "1 Cup Kopi",
    price: 10000,
    image: "/coffe.jpg",
  },
  {
    id: "kopi2",
    name: "2 Cup Kopi",
    price: 20000,
    image: "/coffe.jpg",
  },
  {
    id: "kopi3",
    name: "3 Cup Kopi",
    price: 50000,
    image: "/coffe.jpg",
  },
];


const DonateForm = ({
    product
    
}: {
    product: ProductDetailProps}) => {
    const [state, formAction, isPending] = useActionState(createDonation.bind(null, product.id), null)
    
    return (
    <div>
        <form action={formAction}>
         {/* Pilihan Kopi */}
        <div className="mb-6">
          <p className="mb-2 font-medium text-gray-800">☕ Pilih Kopi</p>

          <div className="grid gap-3 md:grid-cols-3">
            {products.map((p) => (
              <label
                key={p.id}
                className="flex flex-col items-center border rounded-xl p-4 cursor-pointer shadow-sm hover:shadow-md hover:bg-orange-50"
              >
                <input
                  type="radio"
                  name="price"
                  value={p.price}
                  className="hidden peer"
                  required
                />
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {p.name}
                </span>
                <span className="text-xs text-gray-500">
                  Rp {p.price.toLocaleString("id-ID")}
                </span>
                <div className="hidden peer-checked:block text-orange-500 font-bold mt-1">
                  ✓ Dipilih
                </div>
              </label>
            ))}
          </div>

          {/* <p className="text-sm text-red-500 mt-2">{state?.error?.product}</p> */}
        </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                <input type="text" name="name" className="py-2 px-4 rounded-md border border-gray-300 w-full" placeholder="Full Name"/>
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                <input type="text" name="phone" className="py-2 px-4 rounded-md border border-gray-300 w-full" placeholder="Phone Number"/>
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
                </div>
            </div>
            <button type="submit" className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500", {
                "opacity-50 cursor-orogress": isPending,
            }
            )}
            disabled={isPending}
            >
                {isPending ? "Loading..." : "Traktir"}
            </button>
        </form>
    </div>
  )
}

export default DonateForm