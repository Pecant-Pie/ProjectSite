//Copyright 2018 Jason Harriot

var obstacleWidth = 40;
var obstacleHeight = 40;

var obstacleSpacing = 2; 	//WHOLE NUMBER
var obstacleSpeed = 6;	//horizontal speed per loop

//

var player = $("#player");
player.data("speed", 5);	//vertical speed per playerLoop
player.css("height", 20);
player.css("width", 20);
player.css("left", 150);

//

var game = $("#game");
game.css("height", 7 * obstacleHeight * obstacleSpacing);
game.css("width", 9 * obstacleWidth * obstacleSpacing + obstacleWidth);	//blocks can dissapear on both sides- so n blocks by x spacing, + 1 block width

//

var frameTime = 10;	//loop time
var hueSpeed = .01;	//needs more RGB
 
//	flags

var score = 0;
var highscore = 0;

var loopInterval;
var scoreInterval;
var playerInterval;
var collisionInterval;

var endGame;
var currentHue = 0;



////////	source



chromize();
setInterval(chromize, 1000);

$(document).on("keydown", function(){
	$("body").css("cursor", "none");
});

$(document).on("mousemove", function(){
	$("body").css("cursor", "default");
});	

$("#endContainer").hide();

$(document).keydown(function(){
	player.data("speed", -player.data("speed"));
});

////

$(document).one("keydown", initGame);

function initGame(){
	$("#endContainer").hide();
	$("#startContainer").hide();
	player.show();
	
	player.css("top", game.height()/2 - obstacleHeight/2);
	player.data("speed", Math.abs(player.data("speed")));
	
	for(var x = 0; x < (game.width()) / (obstacleWidth * obstacleSpacing); x++){
		game.append(newObstacle(game.width() + (x * obstacleWidth * obstacleSpacing), Math.random() * (game.height() - obstacleHeight)));
	}
	
	chromize();
	
	endGame = false;
	score = 0;
	
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
						endGame = true;
					}
				}
			}
		}
		
		var h = $(this).position().left || 0;
		h -= obstacleSpeed;
		
		if(h + obstacleWidth <= 0){
			data.style.top = Math.random() * (game.height() - obstacleHeight) + "px";
			data.style.left = game.width() + "px";
		} else {
			data.style.left = h + "px";
		}
	});
	
	var top = player.position().top || 0;
	top += player.data("speed");
	player.css("top", top);
	
	
	if(top <= 0 || top + player.height() >= game.height()) endGame = true;
	
	
	
	////////
	
	
	
	if(endGame){
		clearInterval(loopInterval);
		clearInterval(scoreInterval);
		$.each($(".obstacle"), function(index, data){
			$(data).remove();
		});
		player.hide();
		
		highscore = Math.max(score, highscore);
		
		$("#score").text("SCORE: " + score)
		$("#highscore").text("HIGHSCORE: " + highscore);
		
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