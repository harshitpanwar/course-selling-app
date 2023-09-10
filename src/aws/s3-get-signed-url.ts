//get signed url for the file in s3

import { S3 } from 'aws-sdk';

export const s3GetSignedUrl = async (options: any) => {
    
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        
        const { folder, file } = options;
        
        const params:any = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${file.name}`,
            Expires: 60 * 60,
        };
        
        try {
            const response = await s3.getSignedUrlPromise('getObject', params);
            return response;
        } catch (error) {
            return { error };
        }
}