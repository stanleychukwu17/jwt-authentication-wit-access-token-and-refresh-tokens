import { Request, Response } from "express";
import { createSession, getUser, invalidateSession } from "../db/";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

// login handler
export function createSessionHandler(req: Request, res: Response) {
    const { email, password } = req.body;
  
    const user = getUser(email);
  
    if (!user || user.password !== password) {
        return res.status(401).send("Invalid email or password");
    }
  
    const session = createSession(email, user.name);
  
    // create access token
    const accessToken = signJWT(
        { email: user.email, name: user.name, sessionId: session.sessionId },
        process.env.JWT_TIME_1 as string
    );
  
    const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
  
    // send user back
    return res.json({'msg':'okay', accessToken, refreshToken});
}

export function getSessionHandler(req: Request, res: Response) {
    // @ts-ignore
    return res.json(req.user);
}


export function deleteSessionHandler(req: Request, res: Response) {
    // @ts-ignore
    const session = invalidateSession(req.user.sessionId);

    return res.send(session);
}