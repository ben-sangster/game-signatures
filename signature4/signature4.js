var Signature
  , generateColor
  , update
  
  , divArea
  , updateTime = 0
  , lastIndex = 0
  , lastClicked = false
  , signatureData = []
  ;



Signature = function (game, idNum) {
  
   var that = this;
   this.id = idNum;
   this.base = document.createElement("div");
   this.base.className = "signature";
   this.base.id = "base" + idNum;
   this.overlay = document.createElement("div");
   this.overlay.className = "overlay";
   this.base.appendChild(this.overlay);
   this.overlay.innerHTML = game.name;
   this.text = document.createElement("span");
   this.text.className = "gameInfo";
   this.text.id = "text" + idNum;
   this.text.innerHTML = game.info;   
   this.animateHeight = "200px";
   this.base.appendChild(this.text);
   this.info = game.info;
   this.setColor = function (color) { 
      
      that.base.style.backgroundColor = color;
      that.color = color;
   };
   this.updateColor = function () { that.setColor(generateColor(that.id, lastIndex)); }
   this.setColor("transparent");
   $(this.base).hover
      ( function () { that.base.style.backgroundColor = "transparent"; }
      , function () { that.base.style.backgroundColor = that.color; }
      );
      
   this.base.onclick = function () {
          
      if (!that.originalWidth) {
         
         that.originalWidth = document.defaultView.getComputedStyle(that.base, null).getPropertyValue("width");
         that.originalHeight = document.defaultView.getComputedStyle(that.base, null).getPropertyValue("height");
      }
      if (lastClicked === that) { 
         
         lastClicked.close(); 
         lastClicked = false; 
      }
      else {
         
         if (lastClicked) { lastClicked.close(); }
         $(this).animate({ width: "630px" }, "fast").animate
            ( { height: that.animateHeight }
            , { duration: "slow"
              , complete: function () { $("#" + that.text.id).slideToggle("slow"); }
              }
            );
         that.base.style.borderColor = "#224488";
         
         lastClicked = that;
      }
   };
   
   this.close = function () {
      
      that.base.style.borderColor = "#FF3300";
      $("#" + that.text.id).slideToggle("slow");      
      $("#" + that.base.id).animate({ height: that.originalHeight }).animate({ width: that.originalWidth });
      
   };
};

generateColor = function (index, length) {
  
   var columnCount = 3;
   var color = Math.round(255 - ((index / length) * 255))
     , result = "rgb("
     ;
   
   switch (index % columnCount) {
      case 0: result += color + ", 255, 128)"; break;
      case 1: result += "128, " + color + ", 255)"; break;
      case 2: result += "255, 128, " + color + ")"; break;
   };
   
   return result;
};

addItemButton = function () {
   
   var that = this;
   this.base = document.createElement("div");
   this.base.className = "signature";
   this.base.id = "baseX";
   this.base.style.backgroundColor = "transparent";
   this.overlay = document.createElement("div");
   this.overlay.className = "overlay";
   this.base.appendChild(this.overlay);
   this.overlay.innerHTML = "Add Entry";
   this.text = document.createElement("div");
   this.text.className = "gameInfo";
   this.text.id = "textX";
   this.base.appendChild(this.text);   
   this.titleBox = document.createElement("input");
   this.textBox = document.createElement("textarea");
   this.buttonDiv = document.createElement("div");
   this.yesButton = document.createElement("button");
   this.noButton = document.createElement("button");
   this.yesButton.innerHTML = "Confirm";
   this.noButton.innerHTML = "Cancel";
   this.buttonDiv.style.align = "right";
   this.unclicked = true;
   this.textBox.value = "Click Here to add a description for the new game!";
   this.textBox.style.width = "99%";
   this.titleBox.value = "Click Here to add a new game title!";
   this.titleBox.style.width = "99%";
   this.animateHeight = "100px";
   this.textBox.onclick = function (e) { 
      
      if (e.stopPropagation) { e.stopPropagation(); }
      if (that.unclicked) { 
         
         that.textBox.value = ""; 
         that.titleBox.value = "";
         that.unclicked = false;
      }
   };
   this.titleBox.onclick = this.textBox.onclick;
   this.text.appendChild(this.titleBox);
   this.text.appendChild(this.textBox);
   this.buttonDiv.appendChild(this.yesButton);
   this.buttonDiv.appendChild(this.noButton);
   this.text.appendChild(this.buttonDiv);
   
   this.base.onclick = function () {
          
      if (!that.originalWidth) {
         
         that.originalWidth = document.defaultView.getComputedStyle(that.base, null).getPropertyValue("width");
         that.originalHeight = document.defaultView.getComputedStyle(that.base, null).getPropertyValue("height");
      }
      if (lastClicked === that) { 
         
         lastClicked.close(); 
         lastClicked = false; 
      }
      else {
         
         if (lastClicked) { lastClicked.close(); }
         $(this).animate({ width: "630px" }, "fast").animate
            ( { height: that.animateHeight }
            , { duration: "slow"
              , complete: function () { $("#" + that.text.id).slideToggle("slow"); }
              }
            );
         that.base.style.borderColor = "#224488";
         lastClicked = that;
      }
   };
   this.close = function () {
          
      $("#" + that.text.id).slideToggle("slow"); 
      $("#" + that.base.id).animate({ height: that.originalHeight }).animate({ width: that.originalWidth }, { complete: function () {
           
         that.textBox.value = "Click Here to add a description for the new game!";
         that.titleBox.value = "Click Here to add a new game title!";
         that.unclicked = true;  
      }});
   };
   
   this.yesButton.onclick = function () {
      
      console.warn ("Title: " + that.titleBox.value);
      console.warn ("Text: " + that.textBox.value);
      var data = JSON.stringify({ title: that.titleBox.value, text: that.textBox.value });
      $.post("http://localhost:8124/signature4/add/", data, function (postResult) {
         
         console.warn ("postResult: " + postResult);
         updateTime = postResult.time;
      });
   };
   this.noButton.onclick = this.base.onclick;
 
   return this;
};


update = function () { 
   
   console.warn ("updateTime: " + updateTime);
   $.get("http://localhost:8124/signature4/data/", { time: updateTime }, 
      function (data) {
      
         var length = data.data.length;
         updateTime = data.time;
         console.warn ("received: " + data.data);
         if (divArea && length) {
            
            data.data.forEach (function (gameInfo, index) {

               var signature = new Signature(gameInfo, index + lastIndex); 
               divArea.appendChild(signature.base);
               $(signature.text).hide();
               signatureData.push(signature);
            });
            lastIndex += length;
            signatureData.forEach(function (signature, index) { signature.updateColor(); });
         }
      }
   ); 
};

$(document).ready(function () {
   
   var addItem = new addItemButton();
   divArea = document.getElementById("area");
   $(addItem.text).hide();
   document.getElementById("data-mod").appendChild(addItem.base);
   update();
//   setInterval(update, 100); 
});