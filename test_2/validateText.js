
// function written by Avantika Khanna (ak5352)

// This function tests if a number entered in is within a certain range
// and is indeed a number

module.exports = function()
{ 
  var args = Array.prototype.slice.call(arguments);
  
  // Throw error if arguments contain non-finite number values
  if (!args.every(Number.isFinite))
  {
    throw new TypeError('validateText() expects only number input in range 10001 - 11104, no blank input, letters, or special characters.')
  }
  
  // Throw error if arguments contain number values beyond the range of NYC's zipcodes
  for (var i = 0; i < args.length; i++)
  {
	  if (args[i] < 10001 || args[i] > 11104)
	  {
		  throw new TypeError('validateText() expects only number input in range 10001 - 11104, no blank input, letters, or special characters.')
	  }
  }
  
  // Return the zipcode
  return args.reduce(function(a) {
    return a
  }, 10001, 10002, 10004, 11104);

}