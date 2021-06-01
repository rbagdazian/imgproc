import json

def handler(event, context):
  print('received event:')
  print(event)
  
  #dispatch = {'/greeting':greeting }
  
  #fcn = dispatch[event['path']]
  
  #respMsg = fcn(event['queryStringParameters'])
  
  responseMsg = 'response from function greeting!  event: ' + repr(event['queryStringParameters'])
  
  body = {'message':responseMsg}
  
  # here we can perform the incoming event parsing
  # based in request method, path, and query string parameters
  # need to also determine how to handle incoming post data.
  
  # 
  
  response = {
    'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
    'body': json.dumps(body)
  }
  
  return response
  
  