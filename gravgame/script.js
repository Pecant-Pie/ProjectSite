var numObstaclesH = 16;
var numObstaclesV = 16;

var winHeight = 600;
var winWidth = 800;

var obstacleWidth = 40;
var obstacleHeight = 40;

var obstacleSpacing = 2 	//n columns contain 1 obstacle
var obstacleSpeed = 6;


var frameTime = 10;

////

var playerSpeed = 6;

var playerHeight = 20;
var playerWidth = 20;

var endGame;

////

var loopInterval;
var obstacleInterval;

var score = 0;
var highscore = 0;

var currentHue = 0;
var hueSpeed = .0001;

chromize();
$("#player").css("height", playerHeight);
$("#player").css("width", playerWidth);

$("#start").on("click", initGame);

$("#endContainer").hide();
$("#game").css("height", winHeight);
$("#game").css("width", winWidth);
$(document).keydown(function(){
	playerSpeed *= -1;
});

$(document).mousedown(function(){
	playerSpeed *= -1;
});

function initGame(){
	$("#endContainer").hide();
	$("#startContainer").hide();
	$("#player").show();
	clearInterval(loopInterval);
	clearInterval(obstacleInterval);
	
	loopInterval = setInterval(loop, frameTime);
	obstacleInterval = setInterval(function(){
//		console.log("added");
		$("#game").append(newObstacle(winWidth, Math.random() * (winHeight - obstacleHeight)));
	}, obstacleWidth / obstacleSpeed * frameTime * obstacleSpacing);
	
	endGame = false;
	score = 0;
}

function loop(){
	chromize();
	
	////
	
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
			return;
		}
		data.style.left = h + "px";
	});
	var top = parseInt($("#player").css("top")) || 0;
	top += playerSpeed;
	top = Math.max(0, Math.min(winHeight - playerHeight, top));

	$("#player").css("top", top);
	
	score++;
	$("#counter").html(score);
	
	if(endGame){
		clearInterval(loopInterval);
		clearInterval(obstacleInterval);
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
				$("#restart").click();
			});
		}, 250);
		
		$("#restart").on("click", function(e){
			initGame();
		});
	}
}


function chromize(){
	var rgb = HSVtoRGB(currentHue, 1, 1);
	
	console.log(rgb);
	
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