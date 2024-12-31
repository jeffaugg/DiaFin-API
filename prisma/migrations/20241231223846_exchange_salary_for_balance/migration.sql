/*
  Warnings:

  - You are about to drop the column `salary` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "salary",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
