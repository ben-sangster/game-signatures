var divArea
  , Signature
  , generateSignatures
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

Signature = function (gameName) {
  
   this.base = document.createElement("div");
   this.base.className = "signature";
   this.overlay = document.createElement("div");
   this.overlay.className = "overlay";
   this.base.appendChild(this.overlay);
   this.overlay.innerHTML = gameName;
   
};

generateSignatures = function () {
   
   var divArea = document.getElementById("inner-area");

   if (divArea) {
    
      signatureList.sort(function (obj1, obj2) { return (obj1.name > obj2.name) ? 1 : ((obj1.name < obj2.name) ? -1 : 0); });
      signatureList.forEach(function (signatureInfo, index) {
         
         divArea.appendChild((new Signature(signatureInfo.name)).base);
      });      
   }
   else { console.error ("Could not get divArea"); }
};