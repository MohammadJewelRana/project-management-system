import { ZodError, ZodIssue } from "zod";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../middleware/globalErrorHandler";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: String(issue.path[issue.path.length - 1]),
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: " validation Error",
    errorSources,
  };
};
export default handleZodError;
