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
    "City" TEXT,
    "PostalCode" TEXT,
    "Address" TEXT,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedAt" DATETIME,
    "DeletedAt" DATETIME,
    "LastLogin" DATETIME
);

-- CreateTable
CREATE TABLE "Address" (
    "ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
    "Street" TEXT,
    "City" TEXT,
    "State" TEXT,
    "PostalCode" TEXT,
    "Country" TEXT,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedAt" DATETIME,
    "DeletedAt" DATETIME,
    CONSTRAINT "Address_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_NormalizedEmail_key" ON "User"("NormalizedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
