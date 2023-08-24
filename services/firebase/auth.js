const serviceAccount = require("../../serviceAccountKey.json");
const admin = require("firebase-admin");
const { Result } = require("../../utils/validation");
const { fa } = require("faker/lib/locales");

/**
 * We use firebase for SSO instead of storing user credentials in our own servers.
 * 
 */
class FireBaseAuthService {
    // Default session expiration to 5 days
    static EXPIRATION_TIME_LIMIT = 60 * 60 * 24 * 5 * 1000;
    static HTTP_ONLY = true;
    static OPTIONS = { maxAge: EXPIRATION_TIME_LIMIT, httpOnly: HTTP_ONLY };
    
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    /**
     * Check if the user accessing the resource is authorized or not.
     *
     * @param {*} cookies the request cookies
     * @returns a boolean value indicating whether the user is authenticated or not.
     */
    static async authorize(cookies) {
        if (cookies.session) {
            return admin
                .auth()
                .verifySessionCookie(cookies.session)
                .then(() => {
                    return new Result();
                })
                .catch(() => {
                    return new Result({
                        data: data,
                        success: false,
                        msg: msg,
                        code: code
                    });
                });
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
    static async authenticate(idToken) {
        expires_in = FireBaseAuthService.EXPIRATION_TIME_LIMIT;
        return await admin.auth().createSessionCookie(idToken, { expires_in });
    }
}

module.exports = FireBaseAuthService;
