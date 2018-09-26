var ctx = document.getElementById("canvas").getContext("2d");

  var circle1 = new circulo(250,250,50, "#01df01");
  //circle1.draw(ctx);
  circle1.gradient(ctx);
  circle1.random(ctx);
