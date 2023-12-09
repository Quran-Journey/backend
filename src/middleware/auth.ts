import serviceAccount  from "../services/firebase/serviceAccountKey.json";
import * as admin from "firebase-admin";
import { Result } from "../utils/constants";

/**
 * We use firebase for SSO instead of storing user credentials in our own servers.
 */
class AuthenticationMiddleware {
    // Default session expiration to 5 days
    static EXPIRATION_TIME_LIMIT = 60 * 60 * 24 * 5 * 1000;
    static HTTP_ONLY = true;
    static OPTIONS = { maxAge: this.EXPIRATION_TIME_LIMIT, httpOnly: this.HTTP_ONLY };

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as any),
        });
    }

    /**
     * Check if the user accessing the resource is authorized or not.
     *
     * @param {*} cookies the request cookies
     * @returns a boolean value indicating whether the user is authenticated or not.
     */
    static async authorize(cookies: { session?: string }): Promise<Result | boolean> {
        if (cookies.session) {
            try {
                await admin.auth().verifySessionCookie(cookies.session);
                return new Result({});
            } catch (error:any) {
                return new Result({
                    data: error.data, // Replace with appropriate data
                    success: false,
                    msg: error.msg, // Replace with appropriate message
                    code: error.code, // Replace with appropriate code
                });
            }
        } else {
            return false;
        }
    }

    /**
     * Check if the user accessing the resource is authorized or not.
     *
     * @param {string} idToken A string representation of the id Token associated with the user
     * @returns a boolean value indicating whether the user is authenticated or not.
     */
    static async authenticate(idToken: string): Promise<string> {
        const expiresIn = AuthenticationMiddleware.EXPIRATION_TIME_LIMIT;
        return await admin.auth().createSessionCookie(idToken, { expiresIn });
    }
}

export default AuthenticationMiddleware;
