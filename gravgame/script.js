//Copyright 2018 Jason Harriot

var obstacleWidth = 40;
var obstacleHeight = 40;
var obstacleSpacing = 2; 	//WHOLE NUMBER
var obstacleSpeed = .4;	//pixels / ms

var obstaclesH = 9;
var obstaclesV = 7;

var game = $("#game");
game.css("height", obstaclesV * obstacleHeight * obstacleSpacing);
game.css("width", obstaclesH * obstacleWidth * obstacleSpacing + obstacleWidth);

var obstacleDuration = (game.width() + obstacleWidth) / (obstacleSpeed);

var player = $("#player");
playerSpeed = .4;	//vertical speed per playerLoop

var frameTime = 20;	//collision loop time TODO: fix phasing
var hueSpeed = .005;	//needs more RGB

var timeScale = 1;
const acceleration = .9995;

//

var score = 0;
var highscore = 0;
var obstacleInterval;
var scoreInterval;
var loopInterval;
var currentHue = Math.random();

colorize();
setInterval(colorize, 250);

setInterval(function(){
	timeScale *= acceleration;
}, 100);

$(document).on("keydown", function(){
	$("body").css("cursor", "none");
});
$(document).on("mousemove", function(){
	$("body").css("cursor", "default");
});

$("#endContainer").hide();

////

$(document).one("keydown", initGame);
$(document).one("mousedown", initGame);

function initGame(){
	$("#endContainer").hide();
	$("#startContainer").hide();

	$(document).off("keydown");
	$(document).off("mousedown");

	player.css("top", game.height()/2 - obstacleHeight/2);
	player.show();

	$(".obstacle").each(function(index, data){
		$(data).remove();
	});

	colorize();

	timeScale = 1;

	playerSpeed = Math.abs(playerSpeed);
	score = 0;

	obstacleInterval = setInterval(function(){
		var b = newObstacle(game.width(), Math.random() * (game.height() - obstacleHeight));

		game.append(b);
		colorize();
	}, (obstacleWidth * obstacleSpacing) / obstacleSpeed);

	$(document).keydown(movePlayer);
	$(document).on("mousedown", movePlayer);

	movePlayer();

	loopInterval = setInterval(loop, frameTime);
	scoreInterval = setInterval(function(){
		score++;
		$("#counter").text(score);
	}, 100);
}

function loop(){
	$(".obstacle").each(function(index, data){
		if($(this).position().left < player.position().left + player.width()){	//progressive hit scan (saves some CPU? Maybe?)
			if($(this).position().left + obstacleWidth > player.position().left){
				if($(this).position().top < player.position().top + player.height()){
					if($(this).position().top + obstacleWidth > player.position().top){
						$(this).data("hit", "true");
						endGame();
					}
				}
			}
		}
	});
}

function movePlayer(){
	player.stop();
	var top = player.position().top;
	var duration = 0;
	var distance;

	if(playerSpeed > 0) distance = game.height() - (top + player.height());
	else distance = -top;

	duration = Math.abs(distance / playerSpeed);

	player.animate({
		top: "+=" + distance
	}, duration * timeScale, "linear", function(){
		endGame();
	});

	playerSpeed *= -1;
}

function endGame(){
	$(document).off("keydown");
	$(document).off("mousedown");

	player.stop();

	clearInterval(loopInterval);
	clearInterval(scoreInterval);
	clearInterval(obstacleInterval);

	$(".obstacle").each(function(index, data){
		var obj = $(data);
		obj.stop();
		if(!obj.data("hit")) obj.remove();
	});
//	player.hide();

	highscore = Math.max(score, highscore);

	$("#score").text("SCORE: " + score)
	$("#highscore").text("HIGHSCORE: " + highscore);

	$("#endContainer").show();

	setTimeout(function(){
		$(document).one("keydown", initGame);
		$(document).one("mousedown", initGame);
	}, 250);
}

function colorize(){
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

	currentHue += hueSpeed / timeScale;
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

	$(e).animate({
		left: "-=" + (game.width() + obstacleWidth)
		},
		obstacleDuration * timeScale, "linear", function(){
			$(this).remove();
		});

	return e;
}
