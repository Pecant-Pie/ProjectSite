var numObstaclesH = 16;
var numObstaclesV = 16;

var winHeight = 600;
var winWidth = 800;

var obstacleWidth = 40;
var obstacleHeight = 40;

var obstacleDensity = 0.25;	//1 obstacle per n columns
var obstacleSpeed = 10;
var frameTime = 50;

////

var playerSpeed = 15;

var playerHeight = 20;
var playerWidth = 20;

var endGame = false;

////

var loopInterval;
var obstacleInterval;

var score = 0;

begin();
$("#start").on("click", function(){
	$("#startContainer").hide();
	
	loopInterval = setInterval(loop, frameTime);
	obstacleInterval = setInterval(function(){
		console.log("added");
		$("#gameContainer").append(newObstacle(winWidth, Math.random() * (winHeight - obstacleHeight)));
	}, obstacleWidth / obstacleSpeed * frameTime);
});

function begin(){
	$("#endContainer").hide();
	$("#gameContainer").css("height", winHeight);
	$("#gameContainer").css("width", winWidth);
	$(document).keydown(function(){
		playerSpeed *= -1;
		falling = false;
	});
	
	$("#player").css("height", playerHeight);
	$("#player").css("width", playerWidth);
}

function loop(){
	$.each($(".obstacle"), function(index, data){
	if(collide(document.getElementById("player").getBoundingClientRect(), data.getBoundingClientRect())){
			endGame = true;
		}
		
		
		var h = parseInt(data.style.left) || 0;
		h -= obstacleSpeed;
//		console.log(h);
		
		if(h < -obstacleWidth){
//			console.log("Poof!");
			$(data).remove();
			score++;
			return;
		}
		data.style.left = h + "px";
	});
	var top = parseInt($("#player").css("top")) || 0;
	top += playerSpeed;
	top = Math.max(0, Math.min(winHeight - playerHeight, top));

	$("#player").css("top", top);
	
	if(endGame){
		clearInterval(loopInterval);
		clearInterval(obstacleInterval);
		$.each($(".obstacle"), function(index, data){
			$(data).remove();
		});
		
		$("#endContainer").show();
	}
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

function collide(a, b) {
	return a.left < b.left + b.width  && a.left + a.width  > b.left && a.top < b.top + b.height && a.top + a.height > b.top;
}