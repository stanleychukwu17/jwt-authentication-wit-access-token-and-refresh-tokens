import { NextFunction, Request, Response } from "express";
import { getSession } from "../db/index";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.query;
  

    console.log(accessToken, refreshToken, 'resolved at last')

    return next();
}
  
export default deserializeUser;