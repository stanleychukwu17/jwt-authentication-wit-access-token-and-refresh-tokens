const users = [
    {email: "test@test.com",password: "password",name: "Jane Doe"},
];

export const sessions: Record<
    string,
    { sessionId: string; email: string; valid: boolean }
> = {};

export function createSession(email: string, name: string) {
    const sessionId = String(Object.keys(sessions).length + 1);
  
    const session = { sessionId, email, valid: true, name };
  
    sessions[sessionId] = session;
  
    return session;
}

export function getUser(email: string) {
    return users.find((user) => user.email === email);
}