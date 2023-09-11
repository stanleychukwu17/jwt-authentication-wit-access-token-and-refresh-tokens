import { Request, Response } from "express";
import { createSession, getUser } from "../db/";
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
        "30s"
    );
  
    const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
  
    // set access token in cookie
    res.cookie("accessToken", accessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
    });
  
    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
    });
  
    // send user back
    return res.send(session);
}