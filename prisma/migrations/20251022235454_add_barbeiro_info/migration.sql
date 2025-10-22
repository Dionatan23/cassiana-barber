-- CreateTable
CREATE TABLE "BarbeiroInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "foto" TEXT,
    "horarioTrabalho" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "BarbeiroInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "duracao" INTEGER NOT NULL,
    "barbeiroId" INTEGER NOT NULL,
    CONSTRAINT "Servico_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "BarbeiroInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BarbeiroInfo_userId_key" ON "BarbeiroInfo"("userId");
