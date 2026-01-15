/*
  Warnings:

  - You are about to drop the column `ameniriesId` on the `RoomAmenities` table. All the data in the column will be lost.
  - You are about to drop the `contact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amenitiesId` to the `RoomAmenities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomAmenities" DROP CONSTRAINT "RoomAmenities_ameniriesId_fkey";

-- AlterTable
ALTER TABLE "RoomAmenities" DROP COLUMN "ameniriesId",
ADD COLUMN     "amenitiesId" TEXT NOT NULL;

-- DropTable
DROP TABLE "contact";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomAmenities" ADD CONSTRAINT "RoomAmenities_amenitiesId_fkey" FOREIGN KEY ("amenitiesId") REFERENCES "Amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
