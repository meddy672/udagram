# Udagram

## Overview
Udagram is a simple Web Service built with **Node.js**, and **Typescript**, launched on the **AWS Platform** [Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html). The application allows for users to send a
**GET Request** to the **filteredimage** endpoint which parses the URL for the query parameter **image_url** that is used by the server to respond with an image. Once the server has responded with an image, all local images are removed from the server.

## Required Software
1. Node.js 14.16.0
2. TypeScript 4.2.3

## Recommended Software
1. Elastic BeanStalk CLI
2. AWS CLI

## Understanding The Application
1. `src/server.ts` - This file is where server is started and the application is initialized.
2. `src/util/util.ts` - This file contains helper methods to store local images on the server as well as deleting the images.
3. `src/util/tmp` - This directory contains images received by the **filteredimage** request. **Should be empty!!!** See Overview.
4. `src/deployment_screenshots` - This directory contains an screenshot of successful deployments to Elastic Beanstalk.
5. `src/config/config.js` - This file is a basic config file (Only if saving Objects to an S3 bucket). 
6. `src/www` - This directory contains production version the application

## Starting The Application
1. Clone or download the repository
2. Run `npm install`
3. Run `npm run dev`
4. Go to [localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg](localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)
If you see a tabby cat the application is working as expected.

## Building The Application
1. Run `npm run build`
2. The www directory will be created or recreated.
