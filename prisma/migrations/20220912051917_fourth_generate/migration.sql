-- CreateEnum
CREATE TYPE "Card_Type" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "card_number" INTEGER NOT NULL,
    "name_in_card" TEXT NOT NULL,
    "cvc" INTEGER NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "Card_Type" NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_key" ON "cards"("title");

-- CreateIndex
CREATE UNIQUE INDEX "cards_card_number_key" ON "cards"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "networks_id_key" ON "networks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "networks_name_key" ON "networks"("name");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
