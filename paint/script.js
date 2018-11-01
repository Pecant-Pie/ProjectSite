var elem = document.getElementById("can");
var ctx = elem.getContext("2d");

var size = 10;

var hue = 0;
var hueV = 2;

var acc = 10;

var turtle = {
	x: 0,
	y: 0,
	lx: 0,
	ly: 0,
	vx: 0,
	vy: 0
};

var mouse = {
	x: 1,
	y: 1
};

document.addEventListener("keydown", function(e){
	// console.log(e.key);
	if(e.key === " "){
		if(loopInterval != null){
			clearInterval(loopInterval);
			loopInterval = null;
		} else{
			loopInterval = setInterval(loop, 25);
		}
	}
});

var loopInterval;
loopInterval = setInterval(loop, 50);

function loop(){
	//////// VVV BROKEN PHYSICS VVV (but they work a little)

	var xdist = Math.abs(turtle.x - mouse.x) / Math.max(Math.abs(turtle.x - mouse.x), Math.abs(turtle.y - mouse.y));
	var ydist = Math.abs(turtle.y - mouse.y) / Math.max(Math.abs(turtle.x - mouse.x), Math.abs(turtle.y - mouse.y));

	// console.log(xdist + " " + ydist);
	var dist = Math.abs(xdist) + Math.abs(ydist);

	if(mouse.x < turtle.x){
		turtle.vx -= (xdist / dist) * acc;
	} else{
		turtle.vx += (xdist / dist) * acc;
	}
	if(mouse.y < turtle.y){
		turtle.vy -= (ydist / dist) * acc;
	} else{
		turtle.vy += (ydist / dist) * acc;
	}
	turtle.lx = turtle.x;
	turtle.ly = turtle.y;
	turtle.x += turtle.vx;
	turtle.y += turtle.vy;

	draw();
}

function resize() {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}
resize();

window.addEventListener("resize", resize);
document.addEventListener("mousemove", updateMouse);

var pos = {
	x: 0,
	y: 0
};

function updateMouse(e){
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	// console.log(mouse);
}

function setPosition(e) {
	pos.x = e.x;
 	pos.y = e.y;
}

function draw(e) {
	var color = "hsl(" + hue + "," + 100 + "%," + 50 + "%)";
	hue += hueV;


	ctx.beginPath();

	ctx.lineWidth = size;
	ctx.lineCap = "round";
	ctx.strokeStyle = color;
	ctx.moveTo(turtle.lx, turtle.ly);
	ctx.lineTo(turtle.x, turtle.y);
	ctx.stroke();
}
