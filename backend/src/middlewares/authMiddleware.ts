import { Request, Response, NextFunction, RequestHandler } from "express";
import admin from "../firebaseAdmin";

export const authenticate: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // Attach user to req as any
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};