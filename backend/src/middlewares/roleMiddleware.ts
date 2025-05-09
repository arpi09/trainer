import { Request, Response, NextFunction, RequestHandler } from "express";
import admin from "../firebaseAdmin";

// Firestore reference
const db = admin.firestore();

export const authorizeRole = (allowedRoles: string[]): RequestHandler => {
    return async (req, res, next) => {
    // Cast req to any to access .user (set by your auth middleware)
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const userId = user.uid;
    try {
      const userDoc = await db.collection("users").doc(userId).get();
      if (!userDoc.exists) {
        res.status(403).json({ error: "User not found" });
        return;
      }
      const userRole = userDoc.data()?.role;
      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({ error: "Forbidden: insufficient role" });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
};