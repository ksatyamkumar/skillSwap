import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "SkillSwap API",
      version: "1.0.0",
      description:
        "Backend API documentation for SkillSwap",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
});