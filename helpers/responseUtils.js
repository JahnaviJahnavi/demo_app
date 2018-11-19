// Sends a response with the given http return code, message and content
module.exports.sendResponse = function(res, code, msg, objectKey, objectValue)
{
  var response = {
    code : code,
    message : msg,  
    module: objectKey,
    content: objectValue, 
    lastFetchedDate:new Date()
  }

    res.status(code);
	  res.json(response);

	return response;
}