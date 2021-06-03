import boto3

    
def imghandler(pqs):
    # Let's use Amazon S3
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('imgproc-data212120-staging')
    object_summary_iterator = bucket.objects.all()

    # Output the bucket names
    for objects in object_summary_iterator:
        objectc = objects
        break;

    responseMsg = 'Hello from imghandler!' + repr(objectc)
    
    # Print out bucket names
    #bucketList = []
    #for bucket in buckets
    #    bucketList.append(bucket)    