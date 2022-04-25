import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from '../errors/NotAuthorizedError';
import jwt from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer ', '');
  }

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.currentUser = payload;
    next();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(400).json({ success: false, message });
  }
}