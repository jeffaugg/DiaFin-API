/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_id_userId_key" ON "categories"("id", "userId");
