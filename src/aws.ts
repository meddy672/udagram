import AWS from 'aws-sdk';

//Configure AWS
const credentials = new AWS.SharedIniFileCredentials({profile: 'adminMeddy'});
AWS.config.credentials = credentials;


export const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-1',
    params: {Bucket: "udagram-eddy-dev"}
  });


export function getItem() {

    const params = {
        Bucket: "udagram-eddy-dev", 
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
          Bucket: 'udagram-eddy-dev',
          Key: key,
          Expires: signedUrlExpireSeconds
    });
  
      return url;
}