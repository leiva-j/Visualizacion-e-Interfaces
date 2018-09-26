class tablero{

  constructor(w, h, divW, divH){
    this.matriz = [];
    this.sizeW = w;
    this.sizeH = h;
    this.colum = divW;
    this.fila = divH;
    this.arrW = [];
    this.arrY = [];
    this.radio;
    this.jugando = true;
  }

  crearTablero(){
    for(let y = 0; y < this.fila; y++){
    for(let x = 0; x < this.colum; x++){
      let index = (x + y * this.colum);
      this.matriz[index] = 0;
      }
    }
  }

  crearVisual(ctx, jW, canvasH){
    let regulacionMovH = Math.floor(this.sizeH / this.fila);
    let regulacionMovW = Math.floor(this.sizeW / this.colum);
    let hip = Math.sqrt(regulacionMovH * regulacionMovH + regulacionMovW * regulacionMovW);
    let bajarTab = canvasH - this.sizeH;

    let posW = 0;
    let posH = 0;
    let i = 0;
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(jW, bajarTab, this.sizeW, canvasH - bajarTab);
    ctx.closePath();
    for(let h = 0 ; h < this.fila; h++){
    for(let w = 0; w < this.colum; w++){
      ctx.fillStyle = "#8e97a5";
      ctx.beginPath();
      ctx.arc(posW + jW + 35, posH + bajarTab + 35, hip/4, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      this.arrW[i] = posW + jW + 35;
      this.arrY[i] = posH + bajarTab + 35;
      posW += regulacionMovW;
      i++;
      }
    posW = 0;
    posH += regulacionMovH;
    this.radio = hip/4;
    }
  }

  checkClick(x, turnoJ2){
    let moz= 32;//Diferencia por fireFox
    this.jugando = true;
    for(let i = 0; i < this.colum; i++){
      if((x > this.arrW[i] - this.radio + moz)
      && (x < this.arrW[i] + this.radio + moz)){
        this.pintar(i, turnoJ2);
        this.jugando = false;
      }
    }
  }

  pintar(x, turnoJ2){
    let y = this.matrizY(x, turnoJ2);
    if(y !== -1){
      let coin
      if(turnoJ2){coin=coinBlue}else coin=coinRed;
      ctx.beginPath();
      ctx.fillStyle = "#000000";
      this.radio += 1;
      ctx.fillRect(this.arrW[x] - this.radio , this.arrY[y * this.fila - 1] - this.radio, this.radio*2, this.radio*2);
      this.radio -= 1;
      ctx.closePath();

      ctx.drawImage(coin, this.arrW[x] - this.radio, this.arrY[y * this.fila - 1] - this.radio);
    }
  }

  matrizY(x, turnoJ2){
    for(let y = this.fila - 1; y >= 0; y--){
      let index = (x + y * this.colum);
        if(this.matriz[index] == 0){
          if(!turnoJ2){
            this.matriz[index] = 1;
          }else{
            this.matriz[index] = 2;
          }
          return y + 1;
        }
      }
    return -1;
  }

  checkearGanador(){
    if(this.checkearWinH() != seguir){
      return this.checkearWinH();
    }else{
      if(this.checkearWinV() != seguir){
        return this.checkearWinV();
      }else{
        return seguir;
      }
    }
  }

  checkearWinH(){
    for(let y = 0; y < this.fila; y++){
    let  h1 = 0;
    let  h2 = 0;
    for(let x = 0; x < this.colum; x++){
      let index = (x + y * this.colum);
      if (this.matriz[index] == 1){
        h1++;
        h2 = 0;
        if(h1 == 4){return winJ1;}
      }
      if(this.matriz[index] == 2){
          h2++;
          h1 = 0;
          if(h2 == 4){return winJ2;}
        }
      }
    }
  return seguir;
  }

  checkearWinV(){
    for(let x = 0; x < this.colum; x++){
    let  v1 = 0;
    let  v2 = 0;
      for(let y = 0; y < this.fila; y++){
      let index = (x + y * this.colum);
      if (this.matriz[index] == 1){
        v1++;
        v2 = 0;
        if(v1 == 4){return winJ1;}
      }
      if(this.matriz[index] == 2){
          v2++;
          v1 = 0;
          if(v2 == 4){return winJ2;}
        }
      }
    }
  return seguir;
  }

  getUse(){return this.jugando;}
}
