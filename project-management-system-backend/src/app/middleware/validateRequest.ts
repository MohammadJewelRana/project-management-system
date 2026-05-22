import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ZodTypeAny } from "zod";

const validateRequest = (schema: ZodTypeAny) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync(req.body);
      next();
    }
  );
};

export default validateRequest;