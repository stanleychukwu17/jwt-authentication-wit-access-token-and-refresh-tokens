import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
    // console.log(req.query, 'from require user')
    // @ts-ignore
    if (!req.user) {
        return res.json({'msg':'bad'});
    }
  
    return next();
}