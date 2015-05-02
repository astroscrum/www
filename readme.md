# Astroscrum Homepage

This project makes it easier to put a webflow website onto S3 / Cloudfront. 

## Setting up this project.
You will need to install
 - Node
 - NPM 
 - Grunt

Once these are on your system, run `npm install` on each clean pull to get latest packages. 

You will need get the AWS S3 token from Ben. This will be placed into a file called .aws.json. This file isn't be uploaded to github. Copy `.aws.json.example`

## Updating the site.

1. Copy Webflow files into `src`
2. Run `Grunt` to then go to http://localhost:8000 to inspect site. 
3. To upload run `grunt deploy` 



Misc.
http://d2rpzgbj658jlp.cloudfront.net - Cloudfront URL. 

First test: http://www.webpagetest.org/result/150502_PH_9D7/
With minifiy images and adding cache http://www.webpagetest.org/result/150502_AG_9K3/1/details/ 