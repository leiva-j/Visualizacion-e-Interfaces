
class circulo{


   constructor(x,y,r,c){
    this.posX = x;
    this.posY = y;
    this.radio = r;
    this.color = c;
  }

   draw(ctx){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      //DUSK => cubrir coverage
  }

  gradient(ctx){
    var gra = ctx.createRadialGradient(this.posX, this.posY, 25, this.posX, this.posY, this.radio);
    gra.addColorStop(0, 'black');
    gra.addColorStop(1, 'white');
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = gra;
    ctx.fill();
    ctx.closePath();
  }

  random(ctx){
    var x = 100,
    y = 75,
    // Radii of the white glow.
    innerRadius = 5,
    outerRadius = 70,
    // Radius of the entire circle.
    radius = 60;

var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'blue');

ctx.arc(x, y, radius, 0, 2 * Math.PI);

ctx.fillStyle = gradient;
ctx.fill();
  }
}
