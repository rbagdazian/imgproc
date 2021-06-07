import boto3
from urllib.parse import urlparse, parse_qs
import re
from  processImage import processImage
    
def imghandler(pqs):
    
    responseMsg = 'imghandler cmd :: ' + repr(pqs)
    # and return it to the caller.
    return responseMsg        

    cmd = pqs['cmd']
    if(cmd == 'check1'):
        return 'checkpt 1'
    # Let's use Amazon S3
    s3 = boto3.resource('s3')
    if(cmd == 'check2'):
        return 'checkpt 2'
    bucket = s3.Bucket('imgproc-data212120-staging')
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
    elif(cmd == 'filenames'):
        return 'filenames response'
        objnames = []
        for object in object_summary_iterator:
            filekey=object.key
            toks=re.split(r'/', filekey)
            objnames.append(toks[-1])
        return repr(objnames)
    elif(cmd =='filecount'):
        objcount = 0
        for object in object_summary_iterator:
            objcount += 1
        responseMsg = repr(objcount)
    elif(cmd == 'fcn'):
        # here to perform a specific function
        # the key specifies what function is to be performed
        processImage(bucket,key,function)
        function = qinfo['func'][0]
        key = qinfo['key'][0]
    elif(cmd == 'nocmd'):
        responseMsg = 'Could not find cmd parm: '+repr(qinfo)
    else:
        responseMsg = 'Error in image request command: ' + repr(pqs)
    
    return responseMsg
    # Print out bucket names
    #bucketList = []
    #for bucket in buckets
    #    bucketList.append(bucket)    