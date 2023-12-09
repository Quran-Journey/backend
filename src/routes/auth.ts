import { Router, Request, Response } from "express";
import AuthMiddleware from "../middleware/auth";
import responses from "../utils/responses";

const router: Router = Router();

/*
 * @api [post] /login
 *  summary: "create session cookie"
 *  description: "This endpoint uses firebase to create cookies for the admin to access privliged endpoints."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: creates session cookie.
 *    401:
 *      description: UNAUTHORIZED REQUEST!
 *
 */
router.post("/login", async (req: Request, res: Response) => {
    const idToken: string = req.body.idToken.toString();

    // Set session expiration to 5 days
    AuthMiddleware.authenticate(idToken).then(
        (sessionCookie: string) => {
            res.cookie("session", sessionCookie, AuthMiddleware.OPTIONS);
            res.end(JSON.stringify({ status: "success" }));
        },
        (error: any) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
});

/*
 * @api [get] /logout
 *  summary: "clears session cookies"
 *  description: "This endpoint clears session cookies, removing state history of user."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: redirect.
 *
 */
router.get("/logout", (req: Request, res: Response) => {
    res.clearCookie("session");
    res.status(302).redirect("offlinequran.com"); // TODO: This should not be hardcoded
    responses.authResponse(req,res); // Ensure `authResponse` is available in the `responses` module
});

export default router;
