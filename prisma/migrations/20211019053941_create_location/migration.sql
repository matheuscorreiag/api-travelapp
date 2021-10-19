-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "lat" INTEGER NOT NULL,
    "long" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
