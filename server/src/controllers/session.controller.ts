import { Request, Response } from "express";
import { createSession, getUser, invalidateSession, check_if_this_user_has_an_active_session } from "../db/";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

// login handler
// this cade has a bug, a user can login twice since we're not checking to see if a user has an already active session
export function createSessionHandler(req: Request, res: Response) {
    const { email, password } = req.body;
  
    const user = getUser(email);
  
    if (!user || user.password !== password) {
        return res.status(401).send("Invalid email or password");
    }

    // first we check to see if there are any active sessions for this user
    const activeSession = check_if_this_user_has_an_active_session(email)

    // if false, there are no active sessions
    if (activeSession.found === false) {
        // creates a new active session for the user
        const session = createSession(email, user.name);

        // create access token
        const accessToken = signJWT(
            { email: user.email, name: user.name, sessionId: session.sessionId },
            process.env.JWT_TIME_1 as string
        );
    
        // creates a refresh token
        const refreshToken = signJWT({sessionId: session.sessionId}, "1y");
    
        // send user back
        return res.json({'msg':'okay', found: false, accessToken, refreshToken});
    } else {
        return res.json({'msg':'okay', found: true, activeSession});
    }
}

export function getSessionHandler(req: Request, res: Response) {
    // the user (i.e req.user) is gotten from the src/App.ts - there we used "app.use(deserializeUser);" the deserializeUser middleware checks to see if an accessToken was received,
    // it uses the accessToken to find the correct information's for the user
    // @ts-ignore
    return res.json(req.user);
}


export function deleteSessionHandler(req: Request, res: Response) {
    // @ts-ignore
    const session = invalidateSession(req.user.sessionId);

    res.json({'msg':'okay', session})
}