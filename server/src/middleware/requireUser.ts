import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.user) {
        // @ts-ignore
        console.log(req.user)
        return res.json({'msg':'bad'});
    }
  
    return next();
}