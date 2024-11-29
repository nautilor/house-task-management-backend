import { Request, Response, NextFunction } from "express";
import { QueryParamException } from "@exception/QueryParamException";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof QueryParamException) {
    res.status(400).json({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};
