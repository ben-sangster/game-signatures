var divArea
  , Signature
  , generateSignatures
  , randomColor
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

Signature = function (gameName, startColor, endColor) {
  
   this.base = document.createElement("div");
   this.base.className = "signature";
   this.base.style.backgroundColor = startColor;
   this.overlay = document.createElement("div");
   this.overlay.className = "overlay";
   this.base.appendChild(this.overlay);
   this.overlay.innerHTML = gameName;
   
};

generateColor = function (index, length) {
  
   var columnCount = 3;
   var color = Math.round(255 - ((index / length) * 255))
     , result = "rgb("
     ;
   
   switch (index % columnCount) {
      case 0: result += color + ", 0, 0)"; break;
      case 1: result += "0, " + color + ", 0)"; break;
      case 2: result += "0, 0, " + color + ")"; break;
   };
   
   return result;
};

generateSignatures = function () {
   
   var length = signatureList.length
     , divArea = document.getElementById("area")
     ;
   if (divArea) {
    
      signatureList.sort(function (obj1, obj2) { return (obj1.name > obj2.name) ? 1 : ((obj1.name < obj2.name) ? -1 : 0); });
      signatureList.forEach(function (signatureInfo, index) {
         
         divArea.appendChild((new Signature(signatureInfo.name, generateColor(index, length))).base);
      });      
   }
   else { console.error ("Could not get divArea"); }
};