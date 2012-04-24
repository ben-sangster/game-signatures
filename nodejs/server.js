var http = require('http')
  , url = require("url")
  , querystring = require("querystring")
  , data = 
       [ { name: "Bioshock" }
       , { name: "Alpha Centauri" }
       , { name: "Civilization V" }
       , { name: "Modern Warfare" }
       , { name: "Battlefield 3" }
       , { name: "Starcraft II" }
       , { name: "DC Universe Online" }
       , { name: "Rift Online" }
       , { name: "The Old Republic" }
       , { name: "Everquest" }
       , { name: "Guild Wars" }
       , { name: "Guild Wars 2" }
       , { name: "The Secret World" }
       , { name: "Modern Warfare 2" }
       , { name: "Bioshock 2" }
       , { name: "Age of Empires II" }
       , { name: "Minecraft" }
       , { name: "Dragon Age" }
       ]

  , route
  , addData
  , getData
  , getData4
  , getData5
  ;

data.forEach(function (gameInfo) {
   
   gameInfo.info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elementum, tellus id elementum tincidunt, nulla eros tristique nulla, ac ornare lorem massa quis leo. Sed risus enim, vehicula et rhoncus nec, porta et enim. Duis justo dolor, aliquam ut convallis et, viverra et quam. Aliquam hendrerit elementum velit, ut ullamcorper neque blandit nec. Mauris non mauris justo, eu molestie urna. Sed accumsan leo non dolor pulvinar tempus. Nulla cursus sem at nunc faucibus eu aliquet purus luctus.";
   gameInfo.time = 0;
});

getData4 = function (response, filterTime) {
   
   response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
   response.write(JSON.stringify(
      { time: Date.now()
      , data: data.filter(function (gameInfo) { return gameInfo.time >= filterTime; })
      }));
   response.end();
};

// This functionality could result in a bug -- multiple users pushing between
// their intervals would both get new times updated and depending on the return
// order, might not see the update for the previous data. Fixed with a full refresh.

// Could add concurrency code, but save for later stage.
addData4 = function (response, postData) {
   
   var time = Date.now();
   postData = JSON.parse(postData);
   if (postData.title && postData.text) {
      
      data.push({ name: postData.title, info: postData.text, time: time });
   }
   response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
   response.write(JSON.stringify({ time: time }));
   response.end();
};

route = function (pathname, response, time, postData) {
  
   switch (pathname) {
      
      case "/signature4/data/": getData4(response, time, postData); break;
      case "/signature4/add/": addData4(response, postData); break;
      default: console.log("defaulted pathname: " + pathname); break;
   }
};

http.createServer(function (request, response) {
   
   var urlObj = url.parse(request.url)
     , postData = ""
     ;

   request.addListener("data", function (postDataChunk) {
      
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
   });
   
   request.addListener("end", function () { route(urlObj.pathname, response, querystring.parse(urlObj.query)["time"], postData); });
}).listen(8124, "127.0.0.1");

console.log("Server has started.");