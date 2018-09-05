var ctx = document.getElementById("canvas").getContext("2d");
ctx.fillStyle = "#ffffff";
var width = 700;
var height = 500;
var imageData = ctx.createImageData(width, height);
ctx.fillRect(0, 0, width, height);

var color = "#000000";
var grosor = 3;
var pintar = false;

document.getElementById("myPencil").addEventListener("click", choicePencil);
document.getElementById("myErase").addEventListener("click", choiceErase);

document.getElementById("bBlack").addEventListener("click", function(e){choiceColor("black")});
document.getElementById("bRed").addEventListener("click", function(e){choiceColor("red")});
document.getElementById("bGreen").addEventListener("click", function(e){choiceColor("green")});
document.getElementById("bBlue").addEventListener("click", function(e){choiceColor("blue")});

document.getElementById("newFile").addEventListener("click", newFile);
document.getElementById("i_file").addEventListener("click", loadImg);
document.getElementById("loadImgFija").addEventListener("click", loadImgFija);
document.getElementById("saveImg").addEventListener("click", saveImg, false);

document.getElementById("fEscalaGrises").addEventListener("click", escalaGrises);
document.getElementById("fNegativo").addEventListener("click", Negativo);
document.getElementById("fBrillo").addEventListener("click", Brillo);
document.getElementById("fBinarizacion").addEventListener("click", Binarizacion);
document.getElementById("fSepia").addEventListener("click", Sepia);
document.getElementById("fBlur").addEventListener("click", Blur);
document.getElementById("fBlurManopla").addEventListener("click", BlurManopla);
document.getElementById("fDectecionBorde").addEventListener("click", DectecionBorde);

var x = -1;
var y = -1;

document.getElementById("canvas").addEventListener("mousedown", drawT);
document.getElementById("canvas").addEventListener("mouseup", drawF);
document.getElementById("canvas").addEventListener("mousemove", function(e){
  if(pintar){
    if((x === -1) && (y === -1)){
      x = e.layerX;
      y = e.layerY;
    }else{
      ctx.strokeStyle = color;
      ctx.lineWidth = grosor;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(e.layerX, e.layerY);
      ctx.stroke();
      x = e.layerX;
      y = e.layerY;
    }
  }
});




function drawT() {
  pintar = true;
  }

function drawF() {
  pintar = false;
  x = -1;
  y = -1;
  ctx.closePath();
  }

function choicePencil(){
  color = "#000000";
}

function choiceErase(){
  color = "#ffffff";
}

function choiceColor(c){
  color = c;
}

// function loadImg(){
//   var file = document.getElementById('i_file');
//   file.onchange = function(e){
//     var img = new Image();
//     img.src = URL.createObjectURL(e.target.files[0]);
//     img.width = width;
//     img.height = height;
//     console.log(img.width);
//     img.onload = function(){
//       ctx.drawImage(img, 0, 0, this.width, this.height)
//     }
//   }
// }

function loadImg(){
  var file = document.getElementById('i_file');
  file.onchange = function(e){
    var img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function(){
      if (this.width > this.height) {
        if (this.width > width) {
          this.height *= width / this.width;
          this.width = width;
        }
      } else {
        if (this.height > height) {
          this.width *= height / this.height;
          this.height = height;
        }
      }
      console.log(img.width);
      ctx.drawImage(img, 0, 0, this.width , this.height)
    }
  }
}

//----------------------------------------------------
function newFile(){
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
}

function saveImg(){
  var canvas = document.getElementById("canvas");
  var imagen = canvas.toDataURL("image/png");
  this.href = imagen;
}

function loadImgFija(){
  var image1 = new Image();
  image1.src = "js/imagen1.jpg";
  image1.onload = function(){
    myDrawImageMethod(this);
    var imgData = ctx.getImageData(0, 0, this.width, this.height);
    ctx.putImageData(imgData, 0, 0);
  }
}

function myDrawImageMethod(image){
  ctx.drawImage(image, 0, 0);
}

//--------------------------------------------

function escalaGrises(){
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
			for(x=0; x<width; x++){
				for (y=0; y<height; y++){
					var index = (x + y * width) * 4;
					var r = data[index + 0];
					var g = data[index + 1];
					var b = data[index + 2];
          var a = data[index + 3];
					var gray = (r + g + b)/3;
					data[index + 0] = gray;
					data[index + 1] = gray;
					data[index + 2] = gray;
          data[index + 3] = a;
				}
			}
		ctx.putImageData(imageData, 0, 0);
}

function Negativo(){
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
      for(x=0; x<width; x++){
        for (y=0; y<height; y++){
          var index = (x + y * width) * 4;
          var r = data[index + 0];
          var g = data[index + 1];
          var b = data[index + 2];
          var a = data[index + 3];
          data[index + 0] = 255 - r;
          data[index + 1] = 255 - g;
          data[index + 2] = 255 - b;
          data[index + 3] = a;
        }
      }
    ctx.putImageData(imageData, 0, 0);
}

function Brillo(){
  var a = document.getElementById("sliderBrillo").value;
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
      for(x=0; x<width; x++){
        for (y=0; y<height; y++){
          var index = (x + y * width) * 4;
          data[index + 3] = a;
        }
      }
    ctx.putImageData(imageData, 0, 0);
}

function Binarizacion(){
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
  for(x=0; x<width; x++){
    for (y=0; y<height; y++){
      var index = (x + y * width) * 4;
      var r = data[index + 0]
      var g = data[index + 1]
      var b = data[index + 2]
      var a = data[index + 3]
      var gray =  (0.299 * r + 0.587 * g + 0.114 * b)
      if (gray > 120){
        data[index + 0] = 255;
        data[index + 1] = 255;
        data[index + 2] = 255;
        data[index + 3] = a;
      }else{
        data[index + 0] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = a;
        }
      }
    }
  ctx.putImageData(imageData, 0, 0);
}

function Sepia(){
  var r = [0, 0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 44, 45, 47, 48, 49, 52, 54, 55, 57, 59, 60, 62, 65, 67, 69, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 94, 97, 99, 101, 103, 107, 109, 111, 112, 116, 118, 120, 124, 126, 127, 129, 133, 135, 136, 140, 142, 143, 145, 149, 150, 152, 155, 157, 159, 162, 163, 165, 167, 170, 171, 173, 176, 177, 178, 180, 183, 184, 185, 188, 189, 190, 192, 194, 195, 196, 198, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 219, 220, 221, 222, 223, 224, 225, 226, 227, 227, 228, 229, 229, 230, 231, 232, 232, 233, 234, 234, 235, 236, 236, 237, 238, 238, 239, 239, 240, 241, 241, 242, 242, 243, 244, 244, 245, 245, 245, 246, 247, 247, 248, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];

  var g = [0, 0, 1, 2, 2, 3, 5, 5, 6, 7, 8, 8, 10, 11, 11, 12, 13, 15, 15, 16, 17, 18, 18, 19, 21, 22, 22, 23, 24, 26, 26, 27, 28, 29, 31, 31, 32, 33, 34, 35, 35, 37, 38, 39, 40, 41, 43, 44, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 96, 97, 100, 101, 102, 103, 105, 106, 107, 108, 109, 111, 113, 114, 115, 117, 118, 119, 120, 122, 123, 124, 126, 127, 128, 129, 131, 132, 133, 135, 136, 137, 138, 140, 141, 142, 144, 145, 146, 148, 149, 150, 151, 153, 154, 155, 157, 158, 159, 160, 162, 163, 164, 166, 167, 168, 169, 171, 172, 173, 174, 175, 176, 177, 178, 179, 181, 182, 183, 184, 186, 186, 187, 188, 189, 190, 192, 193, 194, 195, 195, 196, 197, 199, 200, 201, 202, 202, 203, 204, 205, 206, 207, 208, 208, 209, 210, 211, 212, 213, 214, 214, 215, 216, 217, 218, 219, 219, 220, 221, 222, 223, 223, 224, 225, 226, 226, 227, 228, 228, 229, 230, 231, 232, 232, 232, 233, 234, 235, 235, 236, 236, 237, 238, 238, 239, 239, 240, 240, 241, 242, 242, 242, 243, 244, 245, 245, 246, 246, 247, 247, 248, 249, 249, 249, 250, 251, 251, 252, 252, 252, 253, 254, 255];

  var b = [53, 53, 53, 54, 54, 54, 55, 55, 55, 56, 57, 57, 57, 58, 58, 58, 59, 59, 59, 60, 61, 61, 61, 62, 62, 63, 63, 63, 64, 65, 65, 65, 66, 66, 67, 67, 67, 68, 69, 69, 69, 70, 70, 71, 71, 72, 73, 73, 73, 74, 74, 75, 75, 76, 77, 77, 78, 78, 79, 79, 80, 81, 81, 82, 82, 83, 83, 84, 85, 85, 86, 86, 87, 87, 88, 89, 89, 90, 90, 91, 91, 93, 93, 94, 94, 95, 95, 96, 97, 98, 98, 99, 99, 100, 101, 102, 102, 103, 104, 105, 105, 106, 106, 107, 108, 109, 109, 110, 111, 111, 112, 113, 114, 114, 115, 116, 117, 117, 118, 119, 119, 121, 121, 122, 122, 123, 124, 125, 126, 126, 127, 128, 129, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 137, 138, 139, 140, 140, 141, 142, 142, 143, 144, 145, 145, 146, 146, 148, 148, 149, 149, 150, 151, 152, 152, 153, 153, 154, 155, 156, 156, 157, 157, 158, 159, 160, 160, 161, 161, 162, 162, 163, 164, 164, 165, 165, 166, 166, 167, 168, 168, 169, 169, 170, 170, 171, 172, 172, 173, 173, 174, 174, 175, 176, 176, 177, 177, 177, 178, 178, 179, 180, 180, 181, 181, 181, 182, 182, 183, 184, 184, 184, 185, 185, 186, 186, 186, 187, 188, 188, 188, 189, 189, 189, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 195, 196, 196, 196, 197, 197, 197, 198, 199];

  //-----------------------------------------------------
  var noise = 120;
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
  for(x=0; x<width; x++){
    for (y=0; y<height; y++){
      var index = (x + y * width) * 4;
      data[index] = r[imageData.data[index]];
      data[index] = g[imageData.data[index]];
      data[index] = b[imageData.data[index]];
      if (noise > 0) {
          var noise = Math.round(noise - Math.random() * noise);
          for(var j=0; j<3; j++){
              var iPN = noise + imageData.data[index + j];
              data[index + j] = (iPN > 255) ? 255 : iPN;
          }
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function Blur(){
var  filter =   [   [1, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 1]];

var factor = 1/9;
var bias = 0;

var w = width;
var h = height;
//-----------------------------------------------------
var retData = ctx.getImageData(0, 0, width, height);
imgData = ctx.getImageData(0, 0, width, height);
data = imgData.data;

filt = 0;
for(var x = 0; x < w;  x++){
    for(var y = 0; y < h; y++){
        var r = 0;
        var g = 0;
        var b = 0;
        var imgX = ((x - Math.floor(filter.length/2)+filterX + w) % w);
        var imgY = ((y - Math.floor(filter.length/2)+filterY + h)%h);

        for(var filterX = 0; filterX < filter.length; filterX++) {
            var filterImgX = (imgX + filterX) % w;
            for(var filterY =0; filterY < filter.length; filterY++) {
                var filterImgY = (imgY + filterY) % h;

                r += imgData.data[filterImgX*4 + filterImgY * w * 4] * filter[filterY][filterX];
                g += imgData.data[filterImgX*4 + filterImgY*w*4 + 1] * filter[filterY][filterX];
                b += imgData.data[filterImgX*4 + filterImgY*w*4 + 2] * filter[filterY][filterX];

            }
        }
        var index = (x + (y * w)) * 4;
        retData.data[imgX*4 + imgY*w*4] = Math.min(Math.max(Math.floor(factor *r + bias),0),255);
        retData.data[imgX*4 + imgY*w*4 + 1] = Math.min(Math.max(Math.floor(factor *g + bias),0),255);
        retData.data[imgX*4 + imgY*w*4 + 2] = Math.min(Math.max(Math.floor(factor *b + bias),0),255);
        retData.data[imgX*4 + imgY*w*4 + 3] = imgData.data[imgX*4 + imgY*w*4 + 3];

    }
  }
ctx.putImageData(retData, 5, 5);
}

function BlurManopla(){
  imageRef = ctx.getImageData(0, 0, width, height);
  dataRef = imageRef.data;
  imageMod = ctx.getImageData(0, 0, width, height);
  dataMod = imageMod.data;
  radio = 3;
  longR = (2*radio) - 1;
  for(x=0; x<width; x++){
    for (y=0; y<height; y++){
      var index = (x + y * width) * 4;
      var puntaHleft = x - radio + 1;
      var puntaVup = y - radio + 1;
      var puntaHright = x + radio - 1;
      var puntaVdown = y + radio - 1;
      if((puntaHleft > 0) && (puntaVup > 0)
        && (puntaHright > 0) && (puntaVdown > 0)){
        //Aca modifico
        xBlur = puntaHleft;
        yBlur = puntaVup;
        var contadorPixeles = 1;
        var r = 0;
        var g = 0;
        var b = 0;
        for (i = 0; i < longR; i++){
          for (i2 = 0; i2 < longR; i2++){
            contadorPixeles++;
            var index2 = (xBlur + yBlur * width) * 4;
            r += dataRef[index2 + 0];
            g += dataRef[index2 + 1];
            b += dataRef[index2 + 2];
            xBlur++;
          }
          xBlur = puntaHleft;
          yBlur++;
        }
      r /= contadorPixeles;
      g /= contadorPixeles;
      b /= contadorPixeles;
      dataMod[index + 0] = r;
      dataMod[index + 1] = g;
      dataMod[index + 2] = b;
      dataMod[index + 3] = dataRef[index + 3];
      }
    }
  }
ctx.putImageData(imageMod, 0, 0);
}

function DectecionBorde(){
  escalaGrises();
  imageData = ctx.getImageData(0, 0, width, height);
  data = imageData.data;
  porc = 40;
  grosorBorde = 255 * porc/ 100;
  for(x=0; x<width; x++){
    for (y=0; y<height; y++){
      var index = (x + y * width) * 4;
      var r = data[index + 0];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
      var gris = (r + g + b) / 3;
      if(gris > grosorBorde){
        data[index + 0] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = a;
      }else{
        data[index + 0] = 255;
        data[index + 1] = 255;
        data[index + 2] = 255;
        data[index + 3] = a;
      }
    }
  }
ctx.putImageData(imageData, 0, 0);
}

//------------------------------------------

  function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }

	//--------------------------------------

	function getRed(imageData, x, y){
		index = (x + y * imageData.width) * 4;
		return imageData.data[index + 0];
	}

	function getGreen(imageData, x, y){
		index = (x + y * imageData.width) * 4;
		return imageData.data[index + 1];
	}

	function getBlue(imageData, x, y){
		index = (x + y * imageData.width) * 4;
		return imageData.data[index + 2];
	}

//--------------------------------------
