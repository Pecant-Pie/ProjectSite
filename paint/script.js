var elem = document.getElementById("can");
var ctx = elem.getContext("2d");

var size = 10;

var hue = 0;
var hueV = 2;

var speed = 3;

var turtle = {
	x: 0,
	y: 0,
	lx: 0,
	ly: 0
};

var mouse = {
	x: 1,
	y: 1
};

document.addEventListener("keydown", function(e){
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
loopInterval = setInterval(loop, 25);

function loop(){
	var xDist = mouse.x - turtle.x;
	var yDist = mouse.y - turtle.y;
	var angle = (Math.atan(Math.abs(yDist / xDist))) / (2 * Math.PI) * 360;

	if(xDist == 0 && yDist == 0){
		return;
	}
	if(xDist >= 0 && yDist > 0){
		angle = 360 - angle;
	}
	if(xDist < 0 && yDist >= 0){
		angle = 180 + angle;
	}
	if(xDist <= 0 && yDist < 0){
		angle = 180 - angle;
	}
	if(xDist > 0 && yDist <= 0){
		// angle = angle;
	}

	turtle.lx = turtle.x;
	turtle.ly = turtle.y;

	turtle.x += Math.max(Math.min(Math.abs(xDist), Math.cos(angle / 360 * 2 * Math.PI) * speed), -Math.abs(xDist));	//The turtle shall not move further than the mouse cursor.
	turtle.y -= Math.max(Math.min(Math.abs(yDist), Math.sin(angle / 360 * 2 * Math.PI) * speed), -Math.abs(yDist));

	draw();
}

function resize() {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}
resize();

document.addEventListener("mousemove", updateMouse);

var pos = {
	x: 0,
	y: 0
};

function updateMouse(e){
	mouse.x = e.clientX;
	mouse.y = e.clientY;
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
