import dotenv from 'dotenv';
dotenv.config();

export const config = {
    "dev": {
      "aws_region": process.env.AWS_REGION,
      "aws_profile": process.env.PROFILE,
      "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
    }
  }