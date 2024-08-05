-- DropIndex
DROP INDEX "Scrape_productId_key";

-- DropIndex
DROP INDEX "Scrape_userId_key";

-- DropIndex
DROP INDEX "Scrape_userId_productId_key";

-- CreateTable
CREATE TABLE "PriceDrop" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PriceDrop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceDrop" ADD CONSTRAINT "PriceDrop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceDrop" ADD CONSTRAINT "PriceDrop_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
