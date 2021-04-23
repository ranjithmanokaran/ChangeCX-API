'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.log(data,'data');
  if (typeof data.fname !== 'string'||typeof data.lname !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      userid: uuid.v1(),  
      id:data.fname + " " +data.lname,    
      firstname:data.fname, 
      lastname:data.lname,
      profileurl:data.imageurl,  
      designation:data.designation, 
      summary:data.summary,
      achievements:data.achievements,
      technicalsummary:data.technicalsummary,
      skills:data.skills,
      othertechnicalskills:data.othertechnicalskills,
      workexperience:data.workexperience,
      projects:data.projects,
      technologies_technologyname:data.technologyname,
      icon:data.icon,
      education:data.education,
      isactive: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create table item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
