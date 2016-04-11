'use strict';

var express = require('express');

var app = express();

require('dotenv').load();


/*
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);
*/

app.use('/',express.static(process.cwd() + '/ts'));

app.get('*', function( req, res) {
    
   var dateString = Date.parse(unescape(req.path.substring(1,req.path.length)));

   if(isNaN(dateString)) {
       dateString = new Date(+unescape(req.path.substring(1,req.path.length)) * 1000);
   }

   var myDate = {
           unix : null,
           natural : null
   }
    
   console.log(+unescape(req.path.substring(1,req.path.length)));
    
   if(!isNaN(dateString)) {
       
       var months = [
           'January',
           'February',
           'March',
           'April',
           'May',
           'June',
           'July',
           'August',
           'September',
           'October',
           'November',
           'December'
           ]
       
       var date = new Date(dateString);
       
       var month = months[date.getMonth()];
       var day = date.getDate();
       var year = date.getFullYear();
       
       var dateFormatted = month + ' ' + day + ', ' + year;
       
       myDate.unix = dateString/1000;
       myDate.natural = dateFormatted;
   }
    
    
    res.end(JSON.stringify(myDate));
      
   
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});