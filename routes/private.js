import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//LIST
router.get("/list", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (err) {
    res.status(500).json({ message: "Falha no servidor." });
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica se o usuário existe antes de deletar
    const userExists = await prisma.user.findUnique({
      where: { id },
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
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
});

//UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica se o usuário existe antes de atualizar
    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { email, name } = req.body;

    // Atualiza o usuário apenas com os campos enviados
    const userDB = await prisma.user.update({
      where: { id },
      data: {
        email: email || userExists.email,
        name: name || userExists.name,
      },
    });

    res.status(200).json(userDB);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});

export default router;
