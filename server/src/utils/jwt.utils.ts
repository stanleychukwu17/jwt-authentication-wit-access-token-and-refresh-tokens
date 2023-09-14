import jwt from "jsonwebtoken";

// i had some issues with the previous private key that i used. it was not upto 2048bit and did not meet the standard requirements for jwt RS256...
// if found a site for the generation of this public and private key - https://travistidwell.com/jsencrypt/demo/
// after jwt.sign, an access token is generated, this token can be verified @ the jwt.io website, just paste the access token into the encoded and then you'll see the decoded payload
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQBHH6JVyCIUcD5CVc1ham2yHkQNCQKJQWbbtWamMZLHwSFkguZm
yFQ11jIWtGRrZXsJhvXvja/xYdL2Fkfguj5Kg/Af3Knp6p3ifclpoFAtx6RhO1pH
fNelh+CLKfSNjPXfjgZ1XD+XQ4a+jSPwfcSvVQIUQhzOQxGvPJXaTKZiDXxv7L9i
SDmfror1jSiFUoRq3pOnZhGwtc+jluTXRcF5N0Us33zBlKv7/2iN4P5H3zUZxt/M
iCepk1WAyvJXhJLbXTePyOU2DGq2QuvVQVSeUVLfpJtQi8agdMRuqWlcf2R01/89
ySolNfC11kq7dAYOnBrc86LRbPcGOKY7aJ69AgMBAAECggEAAb8EFEkSlR/gV26V
2UNsqAfYMd27wzTo2pIMkB39dYwHTtlr4LAgaSX2GtqY8I4QRD6dASGgZTO6ozIO
17Sa3Od6WL3pKgYJlEr0S/SUo1sYbQ6w+7pT7Qt19tSz3VnNm4x4Gh+GrCcLQthi
PoBH+OoEYAzzehjpcTzyjOZ+2z9k4ZgegalT0A5WqG26Oa1jQCiU5cmqJtHQEp4K
yEXV64BjVOUZBPnSxICJl0aYPyZkmJPdgyyXHfbTjxDOkiifVK3Ee8WAEkyFffAL
Bwl2lSVOMx4wmkWoYf7mIpiyq1CB25hVXa/0TXKAFnZT2hh9BCYoD/m8IfB0Z6nh
inslYQKBgQCNiaQgsCp2NBdUpAC2yWbg4kMQs/AboBC1SnypZ/CwdPzsJcQy380i
0FUIVCBnyScARPRX4sw/QzIFaZ/kEgGERLeQqZEDVDychMU3SBuNWiyQNrHlwSKO
QmZ/afVWDsqiJT8kA1RT09aWNUx38TJi5zTF92peEqs/zVCfaUvvGQKBgQCApEFI
+RqBfWLpggOrRARPwel2zN4vRAqhCqU58+11W6/LOFxgTdY23Iqy/WwFHRYeZvdt
0ELIVOM37HhHjgh33jqMZu/VL4UPMblgDckUp0ipxa8iUIXp+9fVuaHlKT4yyCsU
gLrYUoR/vRdgfD2kU0oFzOg8rsC00R/XCBk1RQKBgGmGe6Ybci0a/WIPvLCLTHbS
eyoS3ivalVp1JKixZBRLxN7T8Yn0rl8McLl674YxxTBAOOTlpV5tXPgIHjvO6O6S
xUHICuQug9o2a0uiKVikKKGFBfHEo1zpSL4qY847zPxDROY2zUKKqGzpZA/w9p4i
v4fxxY5J4P/6teeEfCbRAoGAZ1KGVTQuw96PuXmBtOd2hxD6kT7PHiuKVfqU5s0y
5lX0BkeIeplJ+tp8VHMTda/8+gI9rWfem8UCkwJNQTulNZG6eNacvx/hwWhwueOY
pAwQYruyhN8kD+EFZFYq4EKWAHehkmAqsmDkpyybQBXJ9Ngo1ivURBkgEpr89ds9
U/kCgYEAgCEaFHHpDlxbdJZGA/CzsPBMPvRfIzbK7ct0tGkUjdeB4NNg/lc031uf
u9PBLGOG0wQWBgWOUIP27TBoN2u1ANK+09q/VaxrJ2mojRobw5TS5Zo0xGyjh1bh
otK9eA6/K9rJQPNDRUCjiSnpcmVo38q0J/NeU09C8hDV6fIMsY8=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBHH6JVyCIUcD5CVc1ham2y
HkQNCQKJQWbbtWamMZLHwSFkguZmyFQ11jIWtGRrZXsJhvXvja/xYdL2Fkfguj5K
g/Af3Knp6p3ifclpoFAtx6RhO1pHfNelh+CLKfSNjPXfjgZ1XD+XQ4a+jSPwfcSv
VQIUQhzOQxGvPJXaTKZiDXxv7L9iSDmfror1jSiFUoRq3pOnZhGwtc+jluTXRcF5
N0Us33zBlKv7/2iN4P5H3zUZxt/MiCepk1WAyvJXhJLbXTePyOU2DGq2QuvVQVSe
UVLfpJtQi8agdMRuqWlcf2R01/89ySolNfC11kq7dAYOnBrc86LRbPcGOKY7aJ69
AgMBAAE=
-----END PUBLIC KEY-----`;

// sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}

// verify jwt
export function verifyJWT(token: string) {
    // the jwt.verify was wrapped in a try {} catch block because, if jwt.verify is not able to verify a token, it throws an error and this can crash our application
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    } catch (error: any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
  