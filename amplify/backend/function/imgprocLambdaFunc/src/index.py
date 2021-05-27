import json

def handler(event, context):
  print('received event:')
  print(event)
  
  responseMsg = 'Hello from your new Amplify Python lambda!'+'event:'+ event
  print(responseMsg)
  
  body = {'message': responseMsg }
  
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
  
  