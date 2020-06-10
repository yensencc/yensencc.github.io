

var fgImage = null;
var bgImage = null;
var output = null;
 

function loadForegroundImage(){
    var imgFile = document.getElementById("fgfile");
   fgImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("fgcan");
  fgImage.drawTo(canvas);
}

function loadBackgroundImage(){
  var imgFile = document.getElementById("bgfile");
   bgImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("bgcan");
  bgImage.drawTo(canvas);
}

function clearCanvas(){
  
  var fgcan = document.getElementById("fgcan");
  var bgcan = document.getElementById("bgcan");
  
  const ctx1 = fgcan.getContext('2d');
  const ctx2 = bgcan.getContext('2d');
  
  ctx1.clearRect(0, 0, fgcan.width, fgcan.height);
  
  ctx2.clearRect(0, 0, bgcan.width, bgcan.height);

}


function makeGray(){
	for(var pixel of fgImage.values()){
		var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue() ) /  3;
		pixel.setRed(avg);
		pixel.setGreen(avg);
		pixel.setBlue(avg);
  }
  var canvas = document.getElementById("fgcan");
  fgImage.drawTo(canvas);

}

function outputMessage(){
	
  if(fgImage == null || ! fgImage.complete()){
	alert("foreground not loaded");
	return ;
} 
if(bgImage == null || ! bgImage.complete()){
	alert("background not loaded");
}
  output = new SimpleImage(bgImage.getWidth(), fgImage.getHeight());
  
  for( var pixel of fgImage.values()){
		
		if(pixel.getGreen() > 250){
     var x = pixel.getX();
		var y = pixel.getY();
			var bgPixel = bgImage.getPixel(x,y);
			output.setPixel(pixel.getX(), pixel.getY(),bgPixel);
		}
		else {
			output.setPixel(pixel.getX(), pixel.getY(),pixel);
    
		}
	}
  
 var canvas = document.getElementById("fgcan");
  output.drawTo(canvas);
  
}


	
  
 
  


