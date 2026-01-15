import { Metadata } from "next"
import { Suspense } from "react"
import HeaderSection from "@/components/header-section"
import Main from "@/components/main"
import RoomSkeleton from "@/components/skeleton/room-skeleton"

export const metadata:Metadata ={
    title: "Room & Rates",
    description: "Choose your best room today"
}

export default function RoomPage() {
  return (
    <div>
        <HeaderSection title="Rooms & Rates" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="mt-10 px-4">
            <Suspense fallback={<RoomSkeleton />}>
                <Main/>
            </Suspense>
        </div>
    </div>
  )
}