import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import notFound from "./middleware/notFound";
import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

//Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://quranverse-beta.vercel.app",
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// base route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Project management Backend Server is running ",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
