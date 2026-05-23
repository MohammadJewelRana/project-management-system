import { Application } from "express";

import swaggerUi from "swagger-ui-express";

import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Project Management API",

      version: "1.0.0",

      description: "Project Management System Backend API",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

apis: ["./src/app/module/**/*.route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application) => {
  app.use(
    "/api-docs",

    swaggerUi.serve,

    swaggerUi.setup(swaggerSpec)
  );
};

export default swaggerDocs;
