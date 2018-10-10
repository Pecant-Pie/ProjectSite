var numObstaclesH = 16;
var numObstaclesV = 16;

var winHeight = 600;
var winWidth = 800;

var obstacleWidth = winWidth / numObstaclesH;
var obstacleHeight = winHeight / numObstaclesH;

var obstacleDensity = 0.25;
var obstacleSpeed = 10;
var frameTim = 50;

begin();
setInterval(loop, frameTime);

setInterval(function(){
	if(Math.random() < obstacleDensity){
			$("#gameContainer").append(newObstacle(winWidth - obstacleWidth, 0));
		}
		
		if(Math.random() < obstacleDensity){
			$("#gameContainer").append(newObstacle(winWidth - obstacleWidth, winHeight - obstacleHeight));
		}
}, 250);

function begin(){
	$("#gameContainer").css("height", winHeight);
	$("#gameContainer").css("width", winWidth);
	
	////////
//	
//	for(var i = 0; i < numObstaclesH; i++){
//		console.log("@ " + i + " & " + i * obstacleWidth);
//		if(Math.random() < obstacleDensity){
//			$("#gameContainer").append(newObstacle(i*obstacleWidth, 0));
//		}
//		
//		if(Math.random() < obstacleDensity){
//			$("#gameContainer").append(newObstacle(i*obstacleWidth, winHeight - obstacleHeight));
//		}
//	}
}

function loop(){
	$.each($(".obstacle"), function(index, data){
		var h = parseInt(data.style.left) || 0;
		h -= obstacleSpeed;
		console.log(h);
		
		if(h < -obstacleWidth){
			console.log("Poof!");
			$(data).remove();
			return;
		}
		data.style.left = h + "px";
	});
}

function newObstacle(x, y){
	var e = document.createElement("div");
	e.classList.add("obstacle");
	e.style.height = obstacleHeight + "px";
	e.style.width = obstacleWidth + "px";
	e.style.left = x + "px";
	e.style.top = y + "px";
	return e;
}