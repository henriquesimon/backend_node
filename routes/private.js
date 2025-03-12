import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//Lista Usuários
router.get("/listar-usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (err) {
    res.status(500).json({ message: "Falha no servidor." });
  }
});

//Deleta Usuário
router.delete("/deletar/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica se o usuário existe antes de deletar
    const userExists = await prisma.user.findUnique({
      where: { id }, // Converte id para número, se necessário
    });

    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Deleta o usuário
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro ao deletar usuário", error: err.message });
  }
});

export default router;
