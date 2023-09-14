const users = [
    {email: "test@test.com",password: "password",name: "Jane Doe"},
];

export const sessions: Record<
    string,
    {sessionId: string; email: string; valid: boolean}
> = {};

export function createSession(email: string, name: string) {
    const sessionId = String(Object.keys(sessions).length + 1);

    const session = {sessionId, email, valid: true, name};

    sessions[sessionId] = session;

    return session;
}

export function check_if_this_user_has_an_active_session (email: string) {
    let found = false;
    let found_session = {}
    let total_sessions = Object.keys(sessions).length

    for (let i = 1; i <= total_sessions; i++) {
        const currentSession = sessions[i];
        if (currentSession['email'] == email && currentSession['valid'] === true) {
            found = true;
            found_session = currentSession;
            break;
        }
    }

    return {'msg': 'okay', found, found_session}
}

export function getUser(email: string) {
    return users.find((user) => user.email === email);
}

export function getSession(sessionId: string) {
    const session = sessions[sessionId];
  
    return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
    const session = sessions[sessionId];

    if (session) {
        sessions[sessionId].valid = false;
    }

    return sessions[sessionId];
}