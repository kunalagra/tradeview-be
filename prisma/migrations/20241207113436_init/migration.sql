-- CreateTable
CREATE TABLE "MarketData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "instrumentName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "broker" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "MarketData_instrumentName_date_idx" ON "MarketData"("instrumentName", "date");

-- CreateIndex
CREATE INDEX "MarketData_date_idx" ON "MarketData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
