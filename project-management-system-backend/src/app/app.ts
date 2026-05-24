import express, { Application, Request, Response } from "express";

import cors from "cors";

import router from "./routes";

import swaggerDocs from "./config/swagger";

import globalErrorHandler from "./middleware/globalErrorHandler";

import notFound from "./middleware/notFound";

const app: Application = express();

/* ======================================================
   PARSERS
====================================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ======================================================
   CORS
====================================================== */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://quranverse-beta.vercel.app",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

/* ======================================================
   SWAGGER DOCS
====================================================== */

swaggerDocs(app);

/* ======================================================
   API ROUTES
====================================================== */

app.use("/api", router);

/* ======================================================
   BASE ROUTE
====================================================== */

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,

    message: "Project Management Backend Server Running",
  });
});

/* ======================================================
   GLOBAL ERROR HANDLER
====================================================== */

app.use(globalErrorHandler);

/* ======================================================
   NOT FOUND
====================================================== */

app.use(notFound);

export default app;
