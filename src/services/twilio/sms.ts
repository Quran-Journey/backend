import Twilio from "twilio";
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const recipientPhoneNumber1 = process.env.RECEPIENT_PHONE_NUMBER_1;
const recipientPhoneNumber2 = process.env.RECEPIENT_PHONE_NUMBER_2;

const client = Twilio(accountSid, authToken);

export async function sendSMS(body: string) {
    let to: string;

    if (recipientPhoneNumber1 === undefined) {
        console.error(
            "Recipient 1 phone number is not defined. Error messages will not be sent to admin."
        );
        return;
    }

    if (recipientPhoneNumber2 === undefined) {
        console.error(
            "Recipient 2 phone number is not defined. Error messages will not be sent to admin."
        );
        return;
    }

    try {
        to = recipientPhoneNumber1;
        var message = await client.messages.create({
            body,
            from: twilioPhone,
            to,
        });
        console.log("SMS sent successfully:", message.sid);
        
        to = recipientPhoneNumber2;
        message = await client.messages.create({
            body,
            from: twilioPhone,
            to,
        });
        console.log("SMS sent successfully:", message.sid);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}
