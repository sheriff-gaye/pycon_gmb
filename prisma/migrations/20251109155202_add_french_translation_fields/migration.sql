-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "authorBio_fr" TEXT,
ADD COLUMN     "content_fr" TEXT,
ADD COLUMN     "excerpt_fr" TEXT,
ADD COLUMN     "title_fr" TEXT,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "excerpt" DROP NOT NULL;
