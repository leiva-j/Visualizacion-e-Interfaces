let ctx = document.getElementById("canvas").getContext("2d");
let ctx2 = document.getElementById("canvas").getContext("2d");

let canvasW = 1100;
let canvasH = 450;

let tableroW = 500;
let tableroH = 400;
let tableroDivH = 6;
let tableroDivW = 7;

let jugadorW = 300;
let jugadorH = 300;

let seguir = -1;
let drawn = 0;
let winJ1 = 1;
let winJ2 = 2;
let turnoJ1 = true;
let JuegoTerminado = false;

let coinRed = new Image();

		coinRed.src="css/CoinRed.png";
		coinRed.crossOrigin = "anonymous";

let coinBlue = new Image();

		coinBlue.src="css/CoinBlue.png";
		coinBlue.crossOrigin = "anonymous";

// let coinRed = document.getElementById("coinRed");
// let coinBlue = document.getElementById("coinBlue");

document.getElementById("Reiniciar").addEventListener("click", reiniciar)

let tablero1 = new tablero(tableroW, tableroH, tableroDivW, tableroDivH);
tablero1.crearTablero()
tablero1.crearVisual(ctx, jugadorW, canvasH);

let jugador1 = new jugador(jugadorW, jugadorH, 5, 3);
jugador1.crearVisual(ctx, 0, true);

let jugador2 = new jugador(jugadorW, jugadorH, 5, 3);
//Me lo deja pegado al tablero con la constante lo muevo contra el margen
let movW = tableroW + jugadorW + 45;

jugador2.crearVisual(ctx, movW, false);
let puedoJugar = false;

function reiniciar(){
	tablero1 = new tablero(tableroW, tableroH, tableroDivW, tableroDivH);
	tablero1.crearTablero()
	tablero1.crearVisual(ctx, jugadorW, canvasH);

	jugador1 = new jugador(jugadorW, jugadorH, 5, 3);
	jugador1.crearVisual(ctx, 0, true);

	jugador2 = new jugador(jugadorW, jugadorH, 5, 3);
	//Me lo deja pegado al tablero con la constante lo muevo contra el margen
	movW = tableroW + jugadorW + 45;

	jugador2.crearVisual(ctx, movW, false);
	puedoJugar = false;
	turnoJ1= true;
	JuegoTerminado = false;
	document.getElementById("Turnos").innerHTML = 'Nuevo Juego: Turno Jugador-1';
}

let jugadaCompletada = false;
document.getElementById("canvas").addEventListener("mousedown", function(e){
  if((!JuegoTerminado) && (e.layerX < jugadorW) && (e.layerY > canvasH - jugadorH)){
    if((turnoJ1) && (!puedoJugar)){
			push();
      let pickCoin = dectectarCanvasJ1(e);
      if(pickCoin){
        turnoJ1 = false;
        puedoJugar = true;
				jugadaCompletada = false;
				jugador1.borrarFicha(e.layerX, e.layerY, ctx);
      }else
      document.getElementById("Turnos").innerHTML = 'Agarra la ficha, gil!';
    }
  }else
  if((!JuegoTerminado) && (e.layerX > tableroW + jugadorW) && (e.layerX < tableroW + jugadorW*2) &&
    (e.layerY > canvasH - jugadorH)){
    if((!turnoJ1) && (!puedoJugar)){
			push();
      let pickCoin = dectectarCanvasJ2(e);
      if(pickCoin){
        turnoJ1 = true;
        puedoJugar = true;
				jugadaCompletada = false;
				jugador2.borrarFicha(e.layerX, e.layerY, ctx);
      }else
      document.getElementById("Turnos").innerHTML = 'Agarra la ficha, gil!';
    }
  }
});

let sostenido = false;
let x = -1;
let y = -1;
//let imgData;
// imgData=ctx.getImageData(100, 100, canvasW, canvasH);
// ctx.putImageData(imgData ,0 ,0);

let imgData;
let frame = 10;
let frameonMove = false;
//document.getElementById("canvas").addEventListener("mousedown", push);
document.getElementById("canvas").addEventListener("mouseup", function(e){
	pushUp();
	if((!JuegoTerminado) && (e.layerX > jugadorW) && (e.layerX < tableroW + jugadorW) &&
		(e.layerY < canvasH - tableroH)){
		if(puedoJugar){
			dectectarCanvasTab(e);//tablero
			if((!puedoJugar) && (!JuegoTerminado)){
				if(turnoJ1){document.getElementById("Turnos").innerHTML = 'Turno Jugador-1';}else
					document.getElementById("Turnos").innerHTML = 'Turno Jugador-2';
					jugadaCompletada = true;
				}else{//las lineas verticales del tablero
					if(!turnoJ1){
						jugador1.recuperarFicha(coinRed, ctx);
					}else
					if(turnoJ1){
						jugador2.recuperarFicha(coinBlue, ctx);
					}
				}
			}
		}else if(!jugadaCompletada){//todo lo demas
			if((!turnoJ1) && (puedoJugar)){
				jugador1.recuperarFicha(coinRed, ctx);
			}else
			if((turnoJ1) && (puedoJugar)){
			 	jugador2.recuperarFicha(coinBlue, ctx);
		 	}
			turnoJ1 = !turnoJ1;
			puedoJugar = !puedoJugar;
		}
	});
let dif = -40;
document.getElementById("canvas").addEventListener("mousemove", function(e){
	let coin;
	if(!turnoJ1){
		coin = coinRed
	}else{coin = coinBlue};
  if((sostenido) && (puedoJugar)){
    frameonMove = true;
    if((x == -1)&&(y == -1)){
      x = e.layerX;
      y = e.layerY;
      imgData=ctx.getImageData(x+dif, y+dif, 50, 50);
    }else{
      if(x + frame < e.layerX){
        ctx.putImageData(imgData , x+dif, y+dif);
        x = e.layerX;
        y = e.layerY;
        imgData=ctx.getImageData(x+dif, y+dif, 50, 50);
        ctx.drawImage(coin, x+dif, y+dif, 50, 50);
      }
      if(y + frame < e.layerY){
        ctx.putImageData(imgData , x+dif, y+dif);
        x = e.layerX;
        y = e.layerY;
        imgData=ctx.getImageData(x+dif, y+dif, 50, 50);
        ctx.drawImage(coin, x+dif, y+dif, 50, 50);
      }
      if(x - frame > e.layerX){
        ctx.putImageData(imgData , x+dif, y+dif);
        x = e.layerX;
        y = e.layerY;
        imgData=ctx.getImageData(x+dif, y+dif, 50, 50);
        ctx.drawImage(coin, x+dif, y+dif, 50, 50);
      }
      if(y - frame > e.layerY){
        ctx.putImageData(imgData , x+dif, y+dif);
        x = e.layerX;
        y = e.layerY;
        imgData=ctx.getImageData(x+dif, y+dif, 50, 50);
        ctx.drawImage(coin, x+dif, y+dif, 50, 50);
      }
    }
  }
});

function push(){
  sostenido = true;
}

function pushUp(){
  sostenido = false;
  if(frameonMove){
    ctx.putImageData(imgData , x+dif, y+dif);
    frameonMove = false;
  }
  x = -1;
  y = -1;
}

function dectectarCanvasJ1(e){
  let pickCoin = jugador1.checkClick(e.layerX, e.layerY);
  return(pickCoin);
}

function dectectarCanvasTab(e){
  //checkea el click y si es correcto pinta
  tablero1.checkClick(e.layerX, turnoJ1);// el turno de J1 esta en curso por eso esta en falso
  puedoJugar = tablero1.getUse();
  if(!puedoJugar){
    ganador = tablero1.checkearGanador();
    if(ganador != seguir){
      switch (ganador){
        case winJ1:
            document.getElementById("Turnos").innerHTML = "Gano el Jugador-1";
          break;
        case winJ2:
            document.getElementById("Turnos").innerHTML = "Gano el Jugador-2";
          break;
        case drawn:
            document.getElementById("Turnos").innerHTML = "Empate!!!";
          break;
      }
      JuegoTerminado = true;
    }
  }
}

function dectectarCanvasJ2(e){
  let pickCoin = jugador2.checkClick(e.layerX, e.layerY);
  return(pickCoin);
}
