-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('APP_ADMIN', 'APP_STAFF', 'ENTERPRISE_ADMIN', 'ENTERPRISE_STAFF', 'ENTERPRISE_CUSTOMER');

-- CreateEnum
CREATE TYPE "SUBSCRIPTION_STATUS" AS ENUM ('ACTIVED', 'ON_HOLD', 'CANCELED', 'AUTO_RENEWED');

-- CreateEnum
CREATE TYPE "MEMBERSHIP_ROLE" AS ENUM ('OWNER', 'MEMBER');

-- CreateTable
CREATE TABLE "enterprises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT,
    "phone_number" TEXT,
    "currencySymbol" TEXT DEFAULT 'S/',
    "domain" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "enterprises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'ENTERPRISE_CUSTOMER',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" TEXT NOT NULL,
    "role" "MEMBERSHIP_ROLE" NOT NULL,
    "enterpriseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_header" (
    "id" TEXT NOT NULL,
    "serie" TEXT NOT NULL DEFAULT 'A-',
    "number" INTEGER NOT NULL DEFAULT 1,
    "total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "enterprise_id" TEXT NOT NULL,

    CONSTRAINT "orders_header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_detail" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "order_header_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "enterprise_id" TEXT NOT NULL,

    CONSTRAINT "orders_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "brand" TEXT,
    "thumbnail" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "published" BOOLEAN DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "category_id" TEXT NOT NULL,
    "enterprise_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "enterprise_id" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "trial_start" TIMESTAMP(3) NOT NULL,
    "trial_end" TIMESTAMP(3) NOT NULL,
    "trial_duration" INTEGER NOT NULL,
    "subs_start" TIMESTAMP(3),
    "subs_end" TIMESTAMP(3),
    "subs_duration" INTEGER NOT NULL DEFAULT 0,
    "status" "SUBSCRIPTION_STATUS" NOT NULL DEFAULT 'ON_HOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plan_id" TEXT NOT NULL,
    "enterprise_id" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_name_key" ON "enterprises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_domain_key" ON "enterprises"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_price_category_id_key" ON "products"("name", "price", "category_id");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_header" ADD CONSTRAINT "orders_header_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_header" ADD CONSTRAINT "orders_header_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "orders_detail_order_header_id_fkey" FOREIGN KEY ("order_header_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "orders_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_detail" ADD CONSTRAINT "orders_detail_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
