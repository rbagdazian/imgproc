import boto3

def imghandler(pqs):
    # Let's use Amazon S3
    s3 = boto3.resource('s3')
    
    # Print out bucket names
    bucketList = list()
    for bucket in s3.buckets.all():
        bucketList.append(bucket)
    
    responseMsg = 'Hello from imghandler!' + repr(bucketList);
    return responseMsg