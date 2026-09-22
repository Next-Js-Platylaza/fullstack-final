import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: {
        id: string
        email: string
    }
}

export default async function auth(req: Request, res : Response, next : NextFunction) {
 try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) throw new Error("Not logged in");

    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET as string) as JwtPayload;
    const {id, email } = decodedToken;
    (req as CustomRequest).user = {
        id,
        email
    }

    next();
 } catch(error)
 {
    console.log("error");
    console.log(error);
    res.status(401).send(`Authentication failed: ${error}`);
 }
}