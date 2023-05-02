CREATE TYPE "USER_ROLE" AS ENUM (
  'ADMIN',
  'CLIENT'
);

CREATE TYPE "SUBS_STATUS" AS ENUM (
  'ACTIVED',
  'CANCELED',
  'AUTO_RENEWED'
);

CREATE TYPE "MEMBERSHIP_ROLE" AS ENUM (
  'OWNER',
  'MEMBER'
);

CREATE TABLE "Enterprises" (
  "id" serial PRIMARY KEY,
  "name" text,
  "image" text,
  "active" boolean
);

CREATE TABLE "Users" (
  "id" serial PRIMARY KEY,
  "firstname" text,
  "lastname" text,
  "email" text UNIQUE,
  "password" text,
  "role" USER_ROLE,
  "active" boolean,
  "enterprise_id" int
);

CREATE TABLE "Memberships" (
  "id" serial PRIMARY KEY,
  "role" MEMBERSHIP_ROLE,
  "user_id" int,
  "enterprise_id" int
);

CREATE TABLE "Subscriptions" (
  "id" serial PRIMARY KEY,
  "trial_start" datetime,
  "trial_end" datetime,
  "subs_start" datetime,
  "subs_end" datetime,
  "status" SUBS_STATUS,
  "enterprise_id" int,
  "plan_id" int
);

CREATE TABLE "Plans" (
  "id" serial PRIMARY KEY,
  "name" text,
  "price" float,
  "duration" int,
  "active" boolean,
  "enterprise_id" int
);

CREATE TABLE "Products" (
  "id" serial PRIMARY KEY,
  "name" text,
  "description" text,
  "code" text,
  "price" float,
  "discountPercentage" float,
  "stock" int,
  "brand" text,
  "active" boolean,
  "category_id" int,
  "enterprise_id" int
);

CREATE TABLE "Categories" (
  "id" serial PRIMARY KEY,
  "name" text,
  "enterprise_id" int
);

CREATE TABLE "SalesHeader" (
  "id" serial PRIMARY KEY,
  "series" text,
  "number" text,
  "total" float,
  "createdAt" datetime,
  "user_id" int,
  "enterprise_id" int
);

CREATE TABLE "SalesDetail" (
  "id" serial PRIMARY KEY,
  "quantity" int,
  "price" float,
  "amount" float,
  "product_id" int,
  "sale_header_id" int,
  "enterprise_id" int
);

ALTER TABLE "SalesHeader" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "SalesDetail" ADD FOREIGN KEY ("sale_header_id") REFERENCES "SalesHeader" ("id");

ALTER TABLE "SalesDetail" ADD FOREIGN KEY ("product_id") REFERENCES "Products" ("id");

ALTER TABLE "Products" ADD FOREIGN KEY ("category_id") REFERENCES "Categories" ("id");

ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("enterprise_id") REFERENCES "Enterprises" ("id");

ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("plan_id") REFERENCES "Plans" ("id");

ALTER TABLE "Memberships" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "Memberships" ADD FOREIGN KEY ("enterprise_id") REFERENCES "Enterprises" ("id");
