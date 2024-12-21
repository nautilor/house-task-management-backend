import { Request, Response, NextFunction } from "express";
import { QueryParamException } from "@exception/QueryParamException";
import { BadRequestException } from "@/exception/BadRequestException";
import { NotFoundException } from "@/exception/NotFoundException";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    err instanceof QueryParamException ||
    err instanceof BadRequestException
  ) {
    res.status(400).json({ message: err.message });
  } else if (err instanceof NotFoundException) {
    res.status(404).json({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};
