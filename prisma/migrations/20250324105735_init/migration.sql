-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderTime" TIMESTAMP(3),
ADD COLUMN     "totalPrice" DECIMAL(65,30);
