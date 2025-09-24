// server/swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Authentication & User API",
    description: "Auto-generated API documentation using swagger-autogen",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json"; // Generated file
const endpointsFiles = ["./server.js"]; // Entry file

swaggerAutogen()(outputFile, endpointsFiles, doc);
