-- DropIndex
DROP INDEX "posts_author_id_idx";

-- CreateIndex
CREATE INDEX "posts_user_id_id_idx" ON "posts"("user_id", "id");
