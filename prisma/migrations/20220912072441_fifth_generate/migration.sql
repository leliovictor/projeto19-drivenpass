-- DropIndex
DROP INDEX "cards_title_key";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "card_number" SET DATA TYPE TEXT,
ALTER COLUMN "cvc" SET DATA TYPE TEXT,
ALTER COLUMN "expiration_date" SET DATA TYPE TEXT;
