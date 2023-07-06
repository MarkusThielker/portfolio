-- CreateTable
CREATE TABLE "posts"
(
    "id"           SERIAL       NOT NULL,
    "slug"         VARCHAR(128) NOT NULL,
    "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"   TIMESTAMP(3) NOT NULL,
    "title"        VARCHAR(255) NOT NULL,
    "teaser"       TEXT         NOT NULL DEFAULT '',
    "content"      TEXT         NOT NULL DEFAULT '',
    "published"    BOOLEAN      NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "view_count"   INTEGER      NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts" ("slug");
