"use client";
import clsx from "clsx";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useActionState, useState } from "react";
import { updateDonation } from "@/lib/actions";
import { TraktirProps } from "@/types/traktir";
import Swal from "sweetalert2";
import { useEffect } from "react";

const EditForm = ({ traktir }: { traktir: TraktirProps }) => {
  const [status, setStatus] = useState(traktir.Payment?.status);
  const [price, setPrice] = useState<number>(traktir.price);
  const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const parseIDR = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
};
  const [state, formAction, isPending] = useActionState(updateDonation.bind(null, traktir.id),null);

  const baseCard =
    "relative cursor-pointer rounded-xl border p-5 transition-all duration-200";

useEffect(() => {
  if (state?.success) {
    Swal.fire({
      icon: "success",
      title: "Update Berhasil",
      text: "Status dan harga donation berhasil diupdate",
      timer: 2000,
      showConfirmButton: false,
    });
  }

  if (state?.error) {
    Swal.fire({
      icon: "error",
      title: "Update Gagal",
      text: "Periksa kembali inputan kamu",
    });
  }
}, [state]);

  return (
    
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4">

          <div className="mb-4">
            <input
              type="text"
              name="price"
              value={formatIDR(price)}
              onChange={(e) => {
                const raw = e.target.value;   // STRING
                const parsed = parseIDR(raw); // ← DI SINI
                setPrice(parsed);             // NUMBER
              }}
              inputMode="numeric"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            />
            
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.price}
              </span>
            </div>
          </div>

      {/* STATUS */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Status Pembayaran
        </h3>

        <div className="grid sm:grid-cols-2 gap-5">

          {/* LUNAS */}
          <label
            className={clsx(
              baseCard,
              status === "paid"
                ? "border-green-500 bg-gradient-to-br from-green-50 to-white shadow-lg scale-[1.02] ring-2 ring-green-400/40"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
          >
            {/* Radio hidden */}
            <input
              type="radio"
              name="status"
              value="paid"
              checked={status === "paid"}
              onChange={() => setStatus("paid")}
              className="sr-only"
            />

            {/* Indicator dot */}
            <span
              className={clsx(
                "absolute top-3 right-3 h-3 w-3 rounded-full transition",
                status === "paid"
                  ? "bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.25)]"
                  : "bg-gray-300"
              )}
            />

            <div className="flex items-center gap-3">
              <CheckCircle
                className={clsx(
                  "h-6 w-6 transition",
                  status === "paid"
                    ? "text-green-600"
                    : "text-gray-400"
                )}
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Lunas
                </p>
                <p className="text-sm text-gray-500">
                  Pembayaran telah diterima
                </p>
              </div>
            </div>
          </label>

          {/* BELUM LUNAS */}
          <label
            className={clsx(
              baseCard,
              status === "unpaid"
                ? "border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02] ring-2 ring-red-400/40"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
          >
            <input
              type="radio"
              name="status"
              value="unpaid"
              checked={status === "unpaid"}
              onChange={() => setStatus("unpaid")}
              className="sr-only"
            />

            <span
              className={clsx(
                "absolute top-3 right-3 h-3 w-3 rounded-full transition",
                status === "unpaid"
                  ? "bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.25)]"
                  : "bg-gray-300"
              )}
            />

            <div className="flex items-center gap-3">
              <AlertCircle
                className={clsx(
                  "h-6 w-6 transition",
                  status === "unpaid"
                    ? "text-red-600"
                    : "text-gray-400"
                )}
              />
              <div>
                <p className="font-semibold text-gray-800">
                  Belum Lunas
                </p>
                <p className="text-sm text-gray-500">
                  Menunggu pembayaran
                </p>
              </div>
            </div>
          </label>
        </div>

      </div>
          {/* General Message */}
          {/* {state?.message && (
            <div className="mb-4 bg-red-200 p-2">
              <span className="text-sm text-gray-700 mt-2">
                {state.message}
              </span>
            </div>
          )} */}

          <button
            type="submit"
            disabled={isPending}
            className={clsx(
              "bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-10 text-lg font-semibold mt-10",
              { "opacity-50 cursor-progress": isPending }
            )}
          >
            {isPending ? "Updating..." : "Update"}
          </button>

        </div>
      </div>
    </form>
  );
};

export default EditForm;
