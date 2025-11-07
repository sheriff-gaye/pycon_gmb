/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `blog_posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `blog_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `blog_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `blog_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "authorRole" TEXT,
ADD COLUMN     "comments" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_isFeatured_idx" ON "blog_posts"("isFeatured");

-- CreateIndex
CREATE INDEX "blog_posts_categoryId_idx" ON "blog_posts"("categoryId");
