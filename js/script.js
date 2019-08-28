var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');


var raquette1Height = 10;
var raquette1Width = 75;
var raquette1x = 110;

var raquette2Height = 10;
var raquette2Width = 75;
var raquette2x = 110;

var x1 = 150;
var y1 = 30;
var dx1 = 1;
var dy1 = 5;
var ballRadius = 8;

var leftPressed = false;
var rightPressed = false;

var compsec = 100;
//var tempsArret = setInterval(temps,1000);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e){
	if(e.keyCode == 37){
		leftPressed = true;
	}
	else if(e.keyCode == 39){
		rightPressed = true;
	}
}
function keyUp(e){
	if(e.keyCode == 37){
		leftPressed = false;
	}
	else if(e.keyCode == 39){
		rightPressed = false;
	}
}

function temps(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	compsec--;
	texteSeconde();
}

function ligne(a,b,c,d,e,f){
	ctx.beginPath();
	ctx.lineWidth = a;
	ctx.strokeStyle = b;
	ctx.moveTo(c,d);
	ctx.lineTo(e,f);
	ctx.stroke();
}
function terrain(){
	ligne('5','white',15,210,280,210);
	ligne('2','purple',15,0,15,420);
	ligne('2','purple',280,0,280,420);
}
function raquette(a,b,c,d,e){
	ctx.beginPath();
	ctx.rect(a,b,c,d);
	ctx.fillStyle = e;
	ctx.fill();
	ctx.closePath();
}
function raquette1(){
	raquette(raquette1x, 410, raquette1Width,
		raquette1Height, 'blue');}
function raquette2(){
	raquette(raquette2x, 0, raquette1Width,
		raquette1Height, 'yellow');
}

function ball(a,b,c,d){
	ctx.beginPath();
	ctx.arc(a, b, c, 0, Math.PI*2);
	ctx.fillStyle = d;
	ctx.fill();
	ctx.closePath();
	}
function ball1(){
	ball(x1, y1 , ballRadius,'red');
}

function moveRaquette1(){
	if(leftPressed && raquette1x > 0){
		raquette1x -= 10;
	}
	if(rightPressed && raquette1x < canvas.width-raquette1Width){
		raquette1x += 10;
	}
}

function texte(a,b,c,d,e){
	ctx.font = a;
	ctx.fillStyle = b;
	ctx.fillText (c,d,e);
}
function texteTime(){
	texte('14px Arial', 'white', 'TIME', 30, 200);
}
function texteSeconde(){
	texte('14px Georgia', 'white', compsec, 40, 230);
}

function rebonBall1(){
	if(x1 > canvas.width-8 || x1 < ballRadius){
		dx1 = -dx1;
	}
	if(y1 < 8){
		dy1 = -dy1;
	}
	if(y1 > 400){
		if(x1 > raquette1x && x1 < raquette1x +
			raquette1Width){
			dy1 = -dy1;
		}
		if (y1 > canvas.height){
			x1 = 225;
			y1 = 100;
		}
	}
}
	
function jeu(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	terrain();
	raquette1();
	raquette2();
	ball1();
	moveRaquette1();
	texteSeconde();
	texteTime();
	raquette2x = x1-40;
	rebonBall1();

	/*x1 += dx1;
	y1 += dy1;*/
	requestAnimationFrame(jeu);
}
jeu();

