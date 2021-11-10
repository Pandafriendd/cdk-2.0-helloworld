import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class Cdk20HelloworldStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,    
      code: new lambda.InlineCode(`
        exports.handler = async function(event) {
          console.log("request:", JSON.stringify(event, undefined, 2));
          return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: "Hello, CDK!!! You've hit " + event.path
          };
        };
        `),
      handler: 'index.handler'
    });
    
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
    
  }
}
