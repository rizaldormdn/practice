require("dotenv").config()

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = String(req.headers['authorization']).split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Invalid token"
      })
    }
    const decoded = jwt.verify(token, String(process.env.TOKEN))
    res.locals.user = decoded

    next()
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      status: false,
      message: "Authentication failed"
    })
  }
}