import boto3
from urllib.parse import urlparse, parse_qs
import re
from  processImage import processImage
from printx import printx
    
def imghandler(pqs):
    s3Bucket = 'imgproc-data212120-staging'
    cmd = pqs['cmd']
    printx('command is:'+cmd)
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
                s3.Object(s3Bucket, filekey).delete()
                found = 1
                responseMsg = 'File ' + pqs['file'] + ' was deleted.'
                break
        if(found == 0):
            responseMsg =  'File ' + pqs['file'] + ' was not found.'
    elif(cmd == 'fcn'):
        # here to perform a specific function
        # the key specifies what function is to be performed
        function = pqs['func']
        file = pqs['file']
        #processImage(bucket,key,function)
        responseMsg = 'not implemented yet'
    elif(cmd == 'nocmd'):
        responseMsg = 'Could not find cmd parm: '+repr(pqs)
    else:
        responseMsg = 'Error in image request command: ' + repr(pqs)
    
    return responseMsg
    # Print out bucket names
    #bucketList = []
    #for bucket in buckets
    #    bucketList.append(bucket)    