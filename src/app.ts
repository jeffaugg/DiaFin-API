import fastify from "fastify";
import { prisma } from "./shared/prisma/PrismaService";
import { errorHandler } from "./config/erro/ErrorHandler";
import { Routes } from "./shared/http/routes";
const app = fastify();

app.addHook("onClose", async (instance) => {
  await prisma.$disconnect();
});

Routes(app);

app.setErrorHandler(errorHandler);

export { app };
