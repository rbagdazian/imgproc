import boto3
from urllib.parse import urlparse, parse_qs
import re
from  processImage import processImage
from printx import printx
import subprocess as sp
import os

def imghandler(pqs):
    s3Bucket = 'imgproc-data212120-staging'
    try:
        pqsd = parse_qs(pqs)
        cmd = pqsd['cmd'][0]
    except:
        cmd = pqs['cmd']
    finally:
        pass
    printx('command is:'+ repr(cmd))
    if(cmd == 'check1'):
        return 'checkpt 1'
    # Let's use Amazon S3
    s3 = boto3.resource('s3')
    if(cmd == 'check2'):
        return 'checkpt 2'
    bucket = s3.Bucket(s3Bucket)
    if(cmd == 'check3'):
        return 'checkpt 3'
    object_summary_iterator = bucket.objects.all()
    if(cmd == 'check4'):
        return 'checkpt 4'
    
    if(cmd == 'files'):
        # Output the bucket names
        objlist = []
        for object in object_summary_iterator:
            objlist.append(object)
        responseMsg = repr(objlist)
    elif(cmd == 'debug'):
        responseMsg = repr(pqs)
    elif(cmd == 'filenames'):
        objnames = []
        for object in object_summary_iterator:
            filekey=object.key
            toks=re.split(r'/', filekey)
            objnames.append([toks[-2], toks[-1]])
        resp = {'files': objnames}
        printx('response is: '+repr(resp))
        return resp
    elif(cmd =='filecount'):
        objcount = 0
        for object in object_summary_iterator:
            objcount += 1
        responseMsg = repr(objcount)
    elif(cmd == 'delete'):
        # user wants to delete a specific file as indicated in query parameter string
        found = 0
        passv = 1
        printx('in delete handler->')
        targetFileToks = re.split(r'/',pqs['file'])
        for object in object_summary_iterator:
            printx(passv)
            passv=passv+1
            filekey = object.key
            toks=re.split(r'/',filekey)
            printx(toks)
            printx(pqs['file'])
            if(toks[-2] == 'input' and toks[-1] == targetFileToks[-1]):
                s3.Object(bucket, filekey).delete()
                found = 1
                responseMsg = 'File ' + pqs['file'] + ' was deleted.'
                break
        if(found == 0):
            responseMsg =  'File ' + pqs['file'] + ' was not found.'
    elif(cmd == 'fcn'):
        # here to perform a specific function
        # the key specifies what function is to be performed
        try:
            function = pqsd['func'][0]
        except:
            function = pqs['func']
        finally:
            pass
        
        try:
            filenm = pqsd['file'][0]
        except:
            filenm = pqs['file']
        finally:
            pass
        
    
        targetFileToks = re.split(r'/',filenm) 
        found=0
        passv = 1
        for object in object_summary_iterator:
            printx(passv)
            passv=passv+1
            filekey = object.key
            toks=re.split(r'/',filekey)
            printx('filekey is:')
            printx(filekey)
            printx(toks)
            printx(filenm)
            theObject = []
            if(toks[-2] == 'input' and toks[-1] == targetFileToks[-1]):
                theObject = object
                break
        if(theObject != []):
            responseMsg = processImage(bucket, theObject, filekey, function )
        else:
            responseMsg = "requested file was not found"
    elif(cmd=='test'):
        # here we want to spawn a child subprocess to invoke an
        # imageMagick function
        
        #result=sp.run(['convert', '-list','gravity'], capture_output=True)
        result=sp.run(['ls','-al','/tmp'],capture_output=True)
        outmsg = "stdout: " + result.stdout.decode('utf-8') + " stderr: "+result.stderr.decode('utf-8')
        printx(outmsg)
        responseMsg = outmsg
        
    elif(cmd == 'nocmd'):
        responseMsg = 'Could not find cmd parm: '+repr(pqs)
    else:
        responseMsg = 'Error in image request command: ' + repr(pqs)
    
    return responseMsg
   