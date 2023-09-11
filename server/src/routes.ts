import { Express } from "express";

import {
    createSessionHandler,
    // getSessionHandler,
    // deleteSessionHandler,
} from "./controllers/session.controller";

function routes(app:Express) {
    // login
    app.post("/api/session", (req, res) => {
        console.log('we have a timeline to become the best')
        console.log(req.body)
        return res.json({'msg':'okay from my server!'})
    });

    // get the current session
    app.get("/api/session", () => {
        console.log('i will very well receive the last of this man!')
    });

    // logout
    // app.delete("/api/session", requireUser, deleteSessionHandler);

    return app
}

export default routes;