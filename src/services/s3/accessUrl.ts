require('dotenv').config();
import AWS from 'aws-sdk';

const region = process.env.AWS_BUCKET_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL(fileType: string, key: string, method: string) {
    // Generate a pre-signed URL for uploading the file to S3
    const params = {
        Bucket: bucketName,
        Key: key,
        ContentType: fileType || "application/pdf",
        Expires: 60
    };
    const url = s3.getSignedUrlPromise(method, params);
     
    return url;
}