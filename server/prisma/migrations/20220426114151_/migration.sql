/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" ALTER COLUMN "day" SET DEFAULT E'MONDAY';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "day";
