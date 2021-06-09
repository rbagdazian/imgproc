import json
from test import testfunc
from imgifce import imghandler

def handler(event, context):
  printx('received event:')
  printx(event)
  
  # setup a single entry dictionary for now
  # to link the incoming path to the corresponding
  # handler in the test.py file.
  dispatch = {
    '/greeting':testfunc, 
    '/image':imghandler
  }
  
  # obtain the function from the dispatch table that
  # we should call based in the incoming path
  fcn = dispatch[event['path']]
  
  # call the handler function supplying any query string parameters
  theQsDict = event['queryStringParameters']
  printx('query string parms')
  printx(repr(theQsDict))
  rs = fcn(theQsDict)
  respMsg = rs

  # place the response into a body that will be jsonified
  body = {'message':respMsg}
  
  # form the response
  response = {
    'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
    'body': json.dumps(body)
  }
  
  # and send it on its way
  return response
  
def printx(s):
  pass