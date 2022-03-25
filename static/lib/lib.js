const okay = function(data, callback)
{
	console.log(data);
	if(callback && typeof callback === "function")
	{
		callback(data);
	}
}

const fail = function(error, data, callback)
{
	console.error(error);
	console.log(data);
	if(callback && typeof callback === "function")
	{
		callback(error, data);
	}
}

const massage = function(templateName, data)
{

}
