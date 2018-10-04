var express = require('express');
var app = express();

    app.get('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:reviewid"); 
    });
    
    app.get('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:n/:stars"); 
    });
    
    app.get('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:n/:from_date/:to_date"); 
    });
    
    app.post('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:reviewid"); 
    });
    
    app.put('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:reviewid"); 
    });
    
    app.delete('/', function(request, response)
    {  
    response.send(__dirname  +" https://server/review/:reviewid"); 
    });
    
app.listen(8080);
