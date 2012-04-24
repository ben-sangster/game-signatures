var Signature
  , generateColor
  
  , lastClicked = false
  , signatureList = 
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
  ;



Signature = function (game, color, index) {
  
   var that = this;
   this.base = document.createElement("div");
   this.base.className = "signature";
   this.base.id = "base" + index;
   this.base.style.backgroundColor = color;
   this.overlay = document.createElement("div");
   this.overlay.className = "overlay";
   this.base.appendChild(this.overlay);
   this.overlay.innerHTML = game.name;
   this.text = document.createElement("span");
   this.text.className = "gameInfo";
   this.text.id = "text" + index;
   this.text.innerHTML = game.info;   
   this.base.appendChild(this.text);
   this.info = game.info;
   this.color = color;
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
            ( { height: "200px"}
            , { duration: "slow"
              , complete: function () { $("#" + that.text.id).slideToggle("slow");
              }
            });
         that.base.style.borderColor = "#224488";
         
         lastClicked = that;
      }
   };
   this.close = function () {
      
      //animate
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

$(document).ready(function () {
   
   var length = signatureList.length
   , divArea = document.getElementById("area")
   ;

   if (divArea) {
     
      signatureList.sort(function (obj1, obj2) { return (obj1.name > obj2.name) ? 1 : ((obj1.name < obj2.name) ? -1 : 0); });
      signatureList.forEach(function (signatureInfo, index) {
         
         signatureInfo.info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elementum, tellus id elementum tincidunt, nulla eros tristique nulla, ac ornare lorem massa quis leo. Sed risus enim, vehicula et rhoncus nec, porta et enim. Duis justo dolor, aliquam ut convallis et, viverra et quam. Aliquam hendrerit elementum velit, ut ullamcorper neque blandit nec. Mauris non mauris justo, eu molestie urna. Sed accumsan leo non dolor pulvinar tempus. Nulla cursus sem at nunc faucibus eu aliquet purus luctus.";
         divArea.appendChild((new Signature(signatureInfo, generateColor(index, length), index)).base);
         $(".gameInfo").hide();
      });      
   }
   else { console.error ("Could not get divArea"); }
});