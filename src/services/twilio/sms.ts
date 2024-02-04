import Twilio from "twilio";
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const recipientPhoneNumber = process.env.RECEPIENT_PHONE_NUMBER;

const client = Twilio(accountSid, authToken);

export async function sendSMS(body: string) {
    let to: string;

    if (recipientPhoneNumber === undefined) {
        console.error(
            "Recipient phone number is not defined. Error messages will not be sent to admin."
        );
        return;
    }

    to = recipientPhoneNumber;
    try {
        const message = await client.messages.create({
            body,
            from: twilioPhone,
            to,
        });

        console.log("SMS sent successfully:", message.sid);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}

