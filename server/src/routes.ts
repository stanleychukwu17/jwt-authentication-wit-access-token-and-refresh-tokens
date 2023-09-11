import { Express } from "express";

function routes(app:Express) {
    // login
    app.post("/api/session", () => {
        console.log('we have a timeline to become the best')
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