-- CreateTable
CREATE TABLE "User" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "NormalizedEmail" TEXT NOT NULL,
    "EmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "Phone" TEXT,
    "PhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "F2aEnabled" BOOLEAN NOT NULL DEFAULT false,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
    "PasswordHash" TEXT NOT NULL,
    "SecurityStamp" TEXT NOT NULL,
    "FirstName" TEXT,
    "LastName" TEXT,
    "DateOfBirth" DATETIME,
    "Country" TEXT,
    "State" TEXT,
    "Street" TEXT,
    "City" TEXT,
    "PostalCode" TEXT,
    "LastLogin" DATETIME,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedAt" DATETIME,
    "DeletedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_NormalizedEmail_key" ON "User"("NormalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
