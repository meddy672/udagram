import AWS from 'aws-sdk';
import { config} from './config/config';

//Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: config.dev.aws_profile});
AWS.config.credentials = credentials;


export const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: config.dev.aws_region,
    params: {Bucket: config.dev.aws_media_bucket}
  });


export function getItem() {

    const params = {
        Bucket: config.dev.aws_media_bucket, 
        Key: "evolution-3885331_1920.jpg"
       };
       s3.getObject(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
    });
}


export function getGetSignedUrl( key: string ): string{

    const signedUrlExpireSeconds = 60 * 5;
  
    const url = s3.getSignedUrl('getObject', {
          Bucket: config.dev.aws_media_bucket,
          Key: key,
          Expires: signedUrlExpireSeconds
    });
  
      return url;
}