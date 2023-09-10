//generic function to upload files to s3

import { S3 } from 'aws-sdk';

export const s3Upload = async (options: any) => {

    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    
    const { folder, file } = options;
    
    const params:any = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${folder}/${file.name}`,
        Body: file.data,
        // ACL: 'public-read',
    };
    
    try {
        const response = await s3.upload(params).promise();
        return response;
    } catch (error) {
        return { error };
    }

}