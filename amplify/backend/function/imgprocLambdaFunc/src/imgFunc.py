def imgfunc(ps):
    # here we simply create a string that reflects the incoming parameter query string 
    responseMsg = 'Response from function imgfunc !; query parameters: ' + repr(ps)
    # and return it to the caller.
    return responseMsg