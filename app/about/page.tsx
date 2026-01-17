import { Metadata } from "next"
import Image from "next/image"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"
import HeaderSection from "@/components/header-section"

export const metadata: Metadata = {
  title: "About",
  description: "Who We Are",
}

const AboutPage = () => {
  return (
    <div>
      <HeaderSection
        title="About Us"
        subTitle="Terus berkarya dengan dukungan tulus."
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Image
            src="/about-image.jpg"
            width={650}
            height={579}
            alt="about image"
          />

          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h1>

            <p className="text-gray-700 py-5">
              Saya adalah seorang developer yang membangun Traktir sebagai
              platform dukungan personal. Website ini dibuat untuk mempermudah
              siapa pun yang ingin memberikan traktiran sebagai bentuk apresiasi
              atas karya yang saya bagikan.
            </p>

            <ul className="space-y-6 pt-8">
              {/* Visi */}
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Visi :</h4>
                  <p className="text-gray-600">
                    Menjadikan dukungan kecil sebagai semangat besar untuk terus
                    belajar, berkarya, dan berkembang secara konsisten.
                  </p>
                </div>
              </li>

              {/* Misi */}
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">Misi :</h4>
                  <ul className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>
                      Menyediakan cara sederhana untuk memberi dukungan personal
                      tanpa proses rumit, cepat, dan nyaman.
                    </li>
                    <li>
                      Menghargai setiap bentuk apresiasi karena dukungan sekecil
                      apa pun memiliki arti besar.
                    </li>
                    <li>
                      Terus berbagi karya dan pembelajaran sebagai bentuk timbal
                      balik atas dukungan yang diberikan.
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
