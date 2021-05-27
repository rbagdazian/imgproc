import json

def handler(event, context):
  print('received event:')
  print(event)
  
  responseMsg = 'Hallo from your new Amplify Python lambda! <br\>'+' event:' + event['path']
  
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
  
  