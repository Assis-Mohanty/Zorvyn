import { verifyJWT } from "./jwt.helper";

export async function getUserIdByJwt(token: string, secret: string): Promise<number> {
    try {
        // from header authorization as bearer token, extract the token and verify it to get the userId        
        const decoded = await verifyJWT(token, secret);
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid JWT token");
    }
}