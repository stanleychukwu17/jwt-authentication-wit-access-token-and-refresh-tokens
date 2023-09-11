import { NextFunction, Request, Response } from "express";
import { getSession } from "../db/index";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies;
  

    console.log(accessToken, refreshToken)
    return res.json({'msg':'okay'})
  }
  
  export default deserializeUser;