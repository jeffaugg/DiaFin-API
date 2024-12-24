import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AppError } from "./AppError";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
    return;
  }

  if (error instanceof z.ZodError) {
    reply.status(400).send({
      status: "error",
      message: error.errors,
    });
    return;
  }

  reply.status(500).send({
    status: "error",
    message: `Internal server error - ${error.message || "Unexpected error"}`,
  });
}
