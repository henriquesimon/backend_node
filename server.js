import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));
