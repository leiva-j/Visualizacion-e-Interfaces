class jugador{

  constructor(w, h, f, c){
    this.sizeW = w;
    this.sizeH = h;
    this.fila= f;
    this.colum = c;
    this.LongImg= 45;
    this.arrX = [];
    this.arrY = [];
    this.recuperarX;
    this.recuperarY;
    this.recuperarI;
  }

  crearVisual(ctx, movW, j1){
    //Acomodado a ojo:
    let regulacionMovH = Math.floor(this.sizeH/2 / this.fila);
    let regulacionMovW = Math.floor(this.sizeW / this.colum);
    regulacionMovW -= 20;//Achico el tamaño de las fichas
    let posW = 0;
    let posH = 0;
    let i = 0;
    regulacionMovW -= 10;//Achico la distancia entre ellas
    regulacionMovH += 30;
    let coin
    if(j1){coin=coinRed}else coin=coinBlue;

    for(let h = 0 ; h < this.fila; h++){
    for(let w = 0; w < this.colum; w++){
      this.arrX[i] = posW + movW + 45;
      this.arrY[i] = posH + this.sizeH/2 + 5;
      ctx.drawImage(coin, this.arrX[i], this.arrY[i]);
      posW += regulacionMovW;
      i++;
      }
    posW = 0;
    posH += regulacionMovH;
    }
  }

  checkClick(x, y){
    let moz= 32;//Cuando lo pase de chrone a moz tuve que hacer esta correcion
    for(let i = 0; i < this.fila * this.colum; i++){
      //al usar un drawImage estas en la punta, no en el medio
      if((x  > this.arrX[i] + moz)
      && (x < this.arrX[i]  + this.LongImg + moz)
      &&(y > this.arrY[i])
      &&(y < this.arrY[i] + this.LongImg)){
        return true;
      }
    }
    return false;
  }

  recuperarFicha(coin, ctx){
    let i = this.recuperarI;
    this.arrY[i] = this.recuperarY;
    this.arrX[i] = this.recuperarX;
    ctx.drawImage(coin, this.arrX[i], this.arrY[i]);
  }

  borrarFicha(x, y, ctx){
    let moz= 32;//Cuando lo pase de chrone a moz tuve que hacer esta correcion
    for(let i = 0; i < this.fila * this.colum; i++){
      //al usar un drawImage estas en la punta, no en el medio
      if((x  > this.arrX[i] + moz)
      && (x < this.arrX[i]  + this.LongImg + moz)
      &&(y > this.arrY[i])
      &&(y < this.arrY[i] + this.LongImg)){
        ctx.clearRect(this.arrX[i], this.arrY[i], 50, 50);
        this.recuperarY = this.arrY[i];
        this.recuperarX = this.arrX[i];
        this.recuperarI = i;
        this.arrX[i]= -100;
        this.arrY[i]= -100;
      }
    }
  }
}
