var express 	  = require('express'),
	bodyParser	  = require('body-parser'),
	indexRoutes   = require('./app/routes/index.js'),
	app 		  = express();
	
require('dotenv').load();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(indexRoutes);
app.use('/public', express.static(process.cwd() + '/public'));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Server started on port ' + port);
});