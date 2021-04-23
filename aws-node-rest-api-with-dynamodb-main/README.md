<!--
title: 'AWS Serverless REST API example in NodeJS'
description: 'This example demonstrates how to setup a RESTful Web Service allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/prasadkovai'
authorName: 'PRASAD P'
authorAvatar: 'https://avatars.githubusercontent.com/u/4400955?s=60&v=4'
-->
# Serverless REST API

This example demonstrates how to setup a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the todo operations. For each operation exactly one file exists e.g. `todos/delete.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

The idea behind the `todos` directory is that in case you want to create a service containing multiple resources e.g. users, notes, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service Serverless-Api-DynamoDB.zip file to S3 (22.91 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
Serverless: Stack update finished…

Service Information
service: Serverless-Api-DynamoDB
stage: dev
region: us-east-1
stack: Serverless-Api-DynamoDB-dev
resources: 35
api keys:
  None
endpoints:
  POST - https://aquj1v3sac.execute-api.us-east-1.amazonaws.com/dev/Resume
  GET - https://aquj1v3sac.execute-api.us-east-1.amazonaws.com/dev/Resume
  GET - https://aquj1v3sac.execute-api.us-east-1.amazonaws.com/dev/Resume/{userid}
  PUT - https://aquj1v3sac.execute-api.us-east-1.amazonaws.com/dev/Resume/{userid}
  DELETE - https://aquj1v3sac.execute-api.us-east-1.amazonaws.com/dev/Resume/{userid}
functions:
  create: User-Resume-Data-dev-create
  list: User-Resume-Data-dev-list
  get: User-Resume-Data-dev-get
  delete: User-Resume-Data-dev-delete
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos --data '{
    "fname":"prasad",
    "lname":"ponnusamy",
    "imageurl":"https://lh3.googleusercontent.com/ogw/ADGmqu_bu5tQZQiKXyCDVtDRf_adMMq6knxbtBkUETRjBQ=s83-c-mo",
    "designation":"Sr.Software Engineer",
    "summary":"this is my summary",
    "achievements":"sucessfully woking 7+ years in development field",
    "technicalsummary":".net,node.js,api",
    "skills":"Fast Learner of all technologies",
    "othertechnicalskills":"Learn new technologies",
    "workexperience":"7+",
    "projectname":"Changecx",
    "description":"ecommerce tools and serverless api with dynamodb",
    "technologyname":"serverless api,vue storefront,ecommerce tools",
    "icon":"Sr.Software Engineer",
    "education_institution":"Crescent Engineering Collage",
    "duration":"2008-2011",
    "education_location":"Chennai",
    "education_subject":"Master of Computer Applications"  
}'
```

Example Result:
```bash
{
    "userid": "0ffc05d0-a0bd-11eb-8143-c5792dc3455e",
    "id": "prasad ponnusamy",
    "firstname": "prasad",
    "lastname": "ponnusamy",
    "profileurl": "https://lh3.googleusercontent.com/ogw/ADGmqu_bu5tQZQiKXyCDVtDRf_adMMq6knxbtBkUETRjBQ=s83-c-mo",
    "designation": "Sr.Software Engineer",
    "summary": "this is my summary",
    "achievements": "sucessfully woking 7+ years in development field",
    "technicalsummary": ".net,node.js,api",
    "skills": "Fast Learner of all technologies",
    "othertechnicalskills": "Learn new technologies",
    "workexperience": "7+",
    "projects_projectname": "Changecx",
    "projects_description": "ecommerce tools and serverless api with dynamodb",
    "technologies_technologyname": "serverless api,vue storefront,ecommerce tools",
    "icon": "Sr.Software Engineer",
    "education_institution": "Crescent Engineering Collage",
    "education_duration": "2008-2011",
    "education_location": "Chennai",
    "education_subject": "Master of Computer Applications",
    "isactive": true,
    "createdAt": 1618801944234,
    "updatedAt": 1618801944234
}%
```

### List all Todos

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos
```

Example output:
```bash
[{
    "userid": "0ffc05d0-a0bd-11eb-8143-c5792dc3455e",
    "id": "prasad ponnusamy",
    "firstname": "prasad",
    "lastname": "ponnusamy",
    "profileurl": "https://lh3.googleusercontent.com/ogw/ADGmqu_bu5tQZQiKXyCDVtDRf_adMMq6knxbtBkUETRjBQ=s83-c-mo",
    "designation": "Sr.Software Engineer",
    "summary": "this is my summary",
    "achievements": "sucessfully woking 7+ years in development field",
    "technicalsummary": ".net,node.js,api",
    "skills": "Fast Learner of all technologies",
    "othertechnicalskills": "Learn new technologies",
    "workexperience": "7+",
    "projects_projectname": "Changecx",
    "projects_description": "ecommerce tools and serverless api with dynamodb",
    "technologies_technologyname": "serverless api,vue storefront,ecommerce tools",
    "icon": "Sr.Software Engineer",
    "education_institution": "Crescent Engineering Collage",
    "education_duration": "2008-2011",
    "education_location": "Chennai",
    "education_subject": "Master of Computer Applications",
    "isactive": true,
    "createdAt": 1618801944234,
    "updatedAt": 1618801944234
}]%
```

### Get one Todo

```bash
# Replace the <userid> part with a real userid from your todos table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<userid>
```

Example Result:
```bash
{
    "userid": "0ffc05d0-a0bd-11eb-8143-c5792dc3455e",
    "id": "prasad ponnusamy",
    "firstname": "prasad",
    "lastname": "ponnusamy",
    "profileurl": "https://lh3.googleusercontent.com/ogw/ADGmqu_bu5tQZQiKXyCDVtDRf_adMMq6knxbtBkUETRjBQ=s83-c-mo",
    "designation": "Sr.Software Engineer",
    "summary": "this is my summary",
    "achievements": "sucessfully woking 7+ years in development field",
    "technicalsummary": ".net,node.js,api",
    "skills": "Fast Learner of all technologies",
    "othertechnicalskills": "Learn new technologies",
    "workexperience": "7+",
    "projects_projectname": "Changecx",
    "projects_description": "ecommerce tools and serverless api with dynamodb",
    "technologies_technologyname": "serverless api,vue storefront,ecommerce tools",
    "icon": "Sr.Software Engineer",
    "education_institution": "Crescent Engineering Collage",
    "education_duration": "2008-2011",
    "education_location": "Chennai",
    "education_subject": "Master of Computer Applications",
    "isactive": true,
    "createdAt": 1618801944234,
    "updatedAt": 1618801944234
}%
```

### Update a Todo

```bash
# Replace the <userid> part with a real userid from your todos table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<id> --data '{ "text": "Prasad P", "checked": true }'
```

Example Result:
```bash
{"text":"Prasad P","userid":"8d7eb300-9e82-11eb-9b49-35bd242162ce","createdAt":1618556912172,"checked":false,"updatedAt":1618556912172}%
```

### Delete a Todo

```bash
# Replace the <userid> part with a real userid from your todos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<userid>
```

No output

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```

In case you expect a lot of traffic fluctuation we recommend to checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)
