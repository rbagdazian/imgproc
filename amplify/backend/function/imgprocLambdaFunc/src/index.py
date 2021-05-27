import json

def handler(event, context):
  print('received event:')
  print(event)
  
  body = {'message': 'Hello from your new Amplify Python lambda!'}
  
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
  
  