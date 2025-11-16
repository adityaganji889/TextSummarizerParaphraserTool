const express = require("express");
// const { loadModels } = require("./config/modelConfig");
const path = require("path");
const app = express();
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const apiRoutes = require("./routes/apiRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Text Summarizer and Paraphrasing Tool API",
      description:
        "A REST API built with Node Js, Express, Hugging Face External ML Transformer Models. This API provides Text Paraphrasing and Summarizing tools.",
    },
    // components: {
    //     securitySchemes: {
    //       bearerAuth: {
    //         type: "http",
    //         scheme: "bearer",
    //       },
    //     },
    //   },
    //   security: [
    //     {
    //       bearerAuth: [],
    //     },
    //   ],
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development Server"
        },
        {
          url: "https://textsummarizerandparaphrasertool.onrender.com",
          description: "Hosted Server"
        }
        // {
        //   url: "https://blogging-platform-og12.onrender.com",
        //   description: "Remote deployment on render.com"
        // }
      ],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

app.use("/api/textai", apiRoutes); // Use /api prefix for routes

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
