const serviceAccount = require("../../serviceAccountKey.json");
const admin = require("firebase-admin");

/**
 * We use firebase for SSO instead of storing user credentials in our own servers.
 * 
 */
class FireBaseAuthService {
    // Default session expiration to 5 days
    static EXPIRATION_TIME_LIMIT = 60 * 60 * 24 * 5 * 1000;

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
    async authorize(cookies) {
        if (cookies.session) {
            return admin
                .auth()
                .verifySessionCookie(cookies.session)
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        } else {
            return false;
        }
    }

    /**
     * Check if the user accessing the resource is authorized or not.
     *
     * @param {*} idToken the id Token associated with the user
     * @returns a boolean value indicating whether the user is authenticated or not.
     */
    async authenticate(idToken) {
        expires_in = FireBaseAuthService.EXPIRATION_TIME_LIMIT;
        return await admin.auth().createSessionCookie(idToken, { expires_in });
    }
}

module.exports = FireBaseAuthService;
