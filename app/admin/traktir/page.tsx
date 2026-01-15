import Link from "next/link";
import TraktirTable from "./traktir-table";
import { Suspense } from "react";

const TraktirPage = () => {
  return (
    <div className="max-w-screen-xl px-4 y-16 mt-30 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Traktir List</h1>
      </div>
      <Suspense fallback={<p>Loading Data...</p>}>
        <TraktirTable/>
      </Suspense>
    </div>
  )
}

export default TraktirPage