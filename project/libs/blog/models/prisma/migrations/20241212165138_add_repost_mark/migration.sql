/*
  Warnings:

  - You are about to drop the column `isOrigin` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "isOrigin",
ADD COLUMN     "reposted" BOOLEAN NOT NULL DEFAULT false;
