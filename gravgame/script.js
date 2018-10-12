var numObstaclesH = 16;
var numObstaclesV = 16;

var obstacleWidth = 40;
var obstacleHeight = 40;

var winHeight = 15 * obstacleHeight;	//must be even multiples for the treadmil to work smoothly
var winWidth = 20 * obstacleWidth;

var obstacleSpacing = 2; 	//n columns contain 1 obstacle

var obstacleSpeed = 6;	//horizontal speed per loop
var playerSpeed = 5;	//vertical speed per playerLoop

var frameTime = 10;	//loop time

var hueSpeed = .01;

////

var playerHeight = 20;
var playerWidth = 20;


////////	Flags
var score = 0;
var highscore = 0;
var loopInterval;
var endGame;
var currentHue = 0;
////////


chromize();
setInterval(chromize, 1000);
$("#player").css("height", playerHeight);
$("#player").css("width", playerWidth);

$(document).one("keydown", initGame);

$("#endContainer").hide();
$("#game").css("height", winHeight);
$("#game").css("width", winWidth);

$(document).keydown(function(){
	playerSpeed *= -1;
});

function initGame(){
	$("#endContainer").hide();
	$("#startContainer").hide();
	$("#player").show();
	
	$("#player").css("top", winHeight/2 - obstacleHeight/2);
	playerSpeed = -Math.abs(playerSpeed);
	
	loopInterval = setInterval(loop, frameTime);
	for(var x = 0; x < winWidth / (obstacleWidth * obstacleSpacing); x++){
		$("#game").append(newObstacle(winWidth + (x * obstacleWidth * obstacleSpacing), Math.random() * (winHeight - obstacleHeight)));
	}
	
	chromize();
	
	endGame = false;
	score = 0;
}

function loop(){
	
	////
	
	$.each($(".obstacle"), function(index, data){
		if(collide(document.getElementById("player").getBoundingClientRect(), data.getBoundingClientRect())){
			endGame = true;
		}
		
		var h = parseInt(data.style.left) || 0;
		h -= obstacleSpeed;
		
		if(h <= -obstacleWidth){
			$(data).css("top", Math.random() * (winHeight - obstacleHeight));
			$(data).css("left", winWidth);
			return;
		}
		data.style.left = h + "px";
	});
	
	var top = parseInt($("#player").css("top")) || 0;
	top += playerSpeed;
	if(top != Math.max(0, Math.min(winHeight - playerHeight, top))) endGame = true;

	$("#player").css("top", top);
	
	score++;
	$("#counter").html(score);
	
	if(endGame){
		clearInterval(loopInterval);
		$.each($(".obstacle"), function(index, data){
			$(data).remove();
		});
		$("#player").hide();
		
		highscore = Math.max(score, highscore);
		
		$("#score").html("SCORE: " + score)
		$("#highscore").html("HIGHSCORE: " + highscore);
		
		$("#endContainer").show();

		setTimeout(function(){
			$(document).one("keydown", function(e){
				initGame();
			});
		}, 250);
	}
}


function chromize(){
	var rgb = HSVtoRGB(currentHue, 1, 1);
	
	
	$.each($(".rBorder"), function(index, data){
		$(data).css("border", "1px solid rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
	});
	
	$.each($(".rText"), function(index, data){
		$(data).css("color", "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
	});
	
	$.each($(".rBG"), function(index, data){
		$(data).css("background-color", "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
	});
	
	currentHue += hueSpeed;
	if(currentHue >= 1) currentHue = 0;
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function newObstacle(x, y){
	var e = document.createElement("div");
	e.classList.add("obstacle");
	e.classList.add("rBG");
	e.style.height = obstacleHeight + "px";
	e.style.width = obstacleWidth + "px";
	e.style.left = x + "px";
	e.style.top = y + "px";
	return e;
}

function collide(a, b) {
	return a.left < b.left + b.width  && a.left + a.width  > b.left && a.top < b.top + b.height && a.top + a.height > b.top;
}