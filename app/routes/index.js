var express  = require('express'),
	router 	 = express.Router();

router.get('/', function(req, res) {
  res.render('index');	
});

router.get('/:str', function(req, res, next) {
  var str = req.params.str;
  var unix = '';
  var natural = '';
  var dateTypes = {"unix" : null, "natural" : null};
  
  if (str) {
    // check if a valid date string
    if (Date.parse(str)) { // natural date passed
    	unix = Date.parse(str);
    	dateTypes.unix = unix;
    	unix = new Date(unix);
    	natural = unixtoNatural(unix);
    	dateTypes.natural = natural;
    }
    else if (!isNaN(str)) { // IS a number and possibly Unix
    	unix = new Date(Number(str));
    	if (unix !== 'Invalid Date') {
    	 natural = unixtoNatural(unix);
    	 dateTypes.natural = natural;
    	 dateTypes.unix = parseInt(str);
    	}
    	else { // a number that is gibberish
    	  unix = null;
    	  natural = null;
    	}
    }
    res.send(dateTypes);
  }
  else { // nothing
    next();
  }
  
});

// to be standard in natural format, every valid date
//string, whether passed as Unix or natural, is converted
// to Unix first and then reconverted to natural.

function unixtoNatural(date) {
  // month full name "lookup dictionary"
  var months = {
                 'Jan' : 'January',
                 'Feb' : 'February',
                 'Mar' : 'March',
                 'Apr' : 'April',
                 'May' : 'May',
                 'Jun' : 'June',
                 'Jul' : 'July',
                 'Aug' : 'August',
                 'Sep' : 'September',
                 'Oct' : 'October',
                 'Nov' : 'November',
                 'Dec' : 'December'
              };
  // split date into array to get date, month and year 
  // and reformat to "Month 00, 0000".
  date = date.toString();
  var dateArr = date.split(' ');
  var natural = months[dateArr[1]] + ' ' + Number(dateArr[2]) + ', ' + dateArr[3];
  return natural;
}

module.exports = router;