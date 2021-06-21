import boto3
from printx import printx
import sys
import subprocess as sp
import os

def processImage(theBucket, theObject, filekey,function):
    image = theObject.get()
    keyList = image.keys()
    printx('File key = ' + repr(filekey) )
    printx('type of image = '+ repr(type(image)) + ' keys-> '+ repr(keyList) )
    printx('Content Type ='+ repr(image['ContentType']) )
    printx('Content Length =' + repr(image['ContentLength']))
    printx('Metadata = ' + repr(image['Metadata']))
    printx('Function = ' + repr(function))
    body = image['Body']
    bodyContents = body.read()
    bodyHeader = bodyContents[0:33]
    bodyHeaderBytes = bytes(bodyHeader)
    bodyHeaderStr = str(bodyHeaderBytes)
    printx(bodyHeaderStr)
    bodysize = sys.getsizeof(bodyContents)
    bodytype = repr(type(bodyContents))
    # here we will write the body Contents out to the working file.
    fileDest = open('/tmp/srcFile.jpg',mode='wb')
    fileDest.write(bodyContents)
    fileDest.close()
    # now lets see what the folder holds
    # ok we should be able to perform some kind of conversion on the image
    curdir = os.getcwd()
    os.chdir('/tmp')

    #processResults = sp.run(["ls","-al"],capture_output=True)
    #printx(processResults.stdout.decode('utf-8'))
    
    if(function == 'negate'):
        exec_function = ['-negate']
        processResults = sp.run(["convert","srcFile.jpg", exec_function[0], "srcFile_out.jpg"],capture_output=True)
    elif(function =='mono'):
        exec_function = ['-colorspace', 'Gray']
        processResults = sp.run(["convert","srcFile.jpg", exec_function[0], exec_function[1], "srcFile_out.jpg"],capture_output=True)
    elif(function == 'gaussian'):
        exec_function = ['-blur', '0x8'] 
        processResults = sp.run(["convert","srcFile.jpg", exec_function[0], exec_function[1], "srcFile_out.jpg"],capture_output=True)
    elif(function == 'edge'):
        exec_function = ['-canny',  '0x1+10%+30%']
        processResults = sp.run(["convert","srcFile.jpg", exec_function[0], exec_function[1], "srcFile_out.jpg"],capture_output=True)
    elif(function =='unsharp'):
        exec_function = ['-unsharp', '0x3+1+0']
        processResults = sp.run(["convert","srcFile.jpg", exec_function[0], exec_function[1],  "srcFile_out.jpg"],capture_output=True)
        
        
    printx('stdout: '+ processResults.stdout.decode('utf-8') + ' stderr: '+ processResults.stderr.decode('utf-8') )
    #processResults = sp.run(["ls","-al"],capture_output=True)
    #printx(processResults.stdout.decode('utf-8'))
    
    filekey2 = filekey.replace("input", "output")
    
    # ok now let's put the modified file back out to the bucket
    #fileSrc = open('/tmp/srcFile_out.jpg',mode='rb')
    #myClient = boto3.client('s3')
    #response = myClient.put_object(
    #Body=fileSrc,
    #Bucket=theBucket,
    #Key=filekey2
    #)
    #fileSrc.close()
    
    theBucket.upload_file('/tmp/srcFile_out.jpg', filekey2)    

    #responseMsg ='processing Image: ' + filekey + ' ' + function + ' ' + repr(type(image))  + ' keys-> '+ repr(keyList) +' '+'Body size ~ ' + '{0:d}'.format(bodysize) + 'Content Length =' + repr(image['ContentLength']) + 'body type='+bodytype + 'body header='+bodyHeaderStr
    #responseMsg ='processing Image: ' + filekey + ' ' + function + ' ' + 'Content Length =' + repr(image['ContentLength'])
    toks = filekey2.split('/')
    responseMsg = toks[-3]+'/output/'+toks[-1]
    printx('response message is ->'+responseMsg)
    os.chdir(curdir)
    return responseMsg
    
