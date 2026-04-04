import pkg from "package.json";
import swaggerJsdoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: pkg.version,
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
  },
  apis: ["./src/docs/components.ts", "./src/modules/**/swagger/components.ts", "./src/modules/**/swagger/auth.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
