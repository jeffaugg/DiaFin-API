import fastify from "fastify";
import { prisma } from "./shared/prisma/PrismaService";
import { errorHandler } from "./config/erro/ErrorHandler";
import { Routes } from "./shared/http/routes";
import { fastifyCors } from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, { origin: "*" });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "DIAFIN API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
app.addHook("onClose", async (instance) => {
  await prisma.$disconnect();
});

Routes(app);

app.setErrorHandler(errorHandler);

export { app };
