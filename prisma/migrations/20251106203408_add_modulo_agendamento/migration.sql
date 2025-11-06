/*
  Warnings:

  - You are about to drop the column `horarioTrabalho` on the `BarbeiroInfo` table. All the data in the column will be lost.
  - You are about to drop the column `passwordEncrypted` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "HorarioTrabalho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "barbeiroId" INTEGER NOT NULL,
    CONSTRAINT "HorarioTrabalho_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "BarbeiroInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HorarioBarbearia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteNome" TEXT NOT NULL,
    "clienteTelefone" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "horaInicio" DATETIME NOT NULL,
    "horaFim" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "tipo" TEXT NOT NULL DEFAULT 'AGENDADO',
    "barbeiroId" INTEGER NOT NULL,
    "servicoId" INTEGER,
    "servicoGlobalId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Agendamento_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "BarbeiroInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_servicoGlobalId_fkey" FOREIGN KEY ("servicoGlobalId") REFERENCES "ServicoGlobal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BarbeiroInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "foto" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "BarbeiroInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BarbeiroInfo" ("foto", "id", "status", "userId") SELECT "foto", "id", "status", "userId" FROM "BarbeiroInfo";
DROP TABLE "BarbeiroInfo";
ALTER TABLE "new_BarbeiroInfo" RENAME TO "BarbeiroInfo";
CREATE UNIQUE INDEX "BarbeiroInfo_userId_key" ON "BarbeiroInfo"("userId");
CREATE TABLE "new_Servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "duracao" INTEGER NOT NULL,
    "barbeiroId" INTEGER,
    CONSTRAINT "Servico_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "BarbeiroInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Servico" ("barbeiroId", "duracao", "id", "nome", "preco") SELECT "barbeiroId", "duracao", "id", "nome", "preco" FROM "Servico";
DROP TABLE "Servico";
ALTER TABLE "new_Servico" RENAME TO "Servico";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'BARBER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role") SELECT "createdAt", "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
