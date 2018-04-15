import * as express from 'express';
import * as path from 'path';
import * as minimist from 'minimist';
import * as BodyParser from 'body-parser';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region:'us-east-1'
});

AWS.config.dynamodb = { endpoint: 'http://localhost:8000' };

let app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Simple get call for testing project setup
app.get('/', function (req, res) {
    console.log("request received");
    res.send({"msg":"Congratulations! Your Node Express API works. "});
});

let dynamodb = new AWS.DynamoDB();
app.get('/users', (req, res) => {
    console.log("request received, fetching user");
    let user = {};
    let dbParams: AWS.DynamoDB.GetItemInput = {
      TableName : 'users',
      Key: {
        "userId" : {
          S: '5'
      }
    }
  };
    // DynamoDB.GetItemInput
    dynamodb.getItem(dbParams, function(error, data){
      if(error){
        console.log('No user found: ',error);
        res.json(user);
      }else{
        if(data){
          console.log('user is : '+data);
          user = data;
          res.json(data);
        }
      }
    });
  });

// app.listen(3000, () => console.log('ready on port 3000') );
export = app;
