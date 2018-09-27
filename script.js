var buttonTramBuffer = 25;

//var turtleWeightMin = 0.9;
//var turtleWeightMax = 1;
var turtleAccel = 2;	//per render frame
var turtleLimit = 20;
var turtleDecay = 0.01;
var turtleRand = 4;

var pacManSize = 50;

var rainAccel = 1;

var wordTilt = 5;
var imageTilt = 10;

////////////////

var mouse = { x: -1, y: -1 };
$(document).mousemove(function(event) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;
	
	updateButtons();
});

setInterval(updatePacman, 35);
setInterval(updateWords, 45);

setInterval(function(){
	var elems = $(".rainTramInactive");
	var elem = $(".rainTramInactive")[Math.floor(Math.random() * $(".rainTramInactive").length)];
	
	elem.classList.add("rainTramActive");
	elem.classList.remove("rainTramInactive");
}, 1000);

$(document).click(function(){
	addPacman();
})

wrapWords();

$(".contentImg").mouseenter(function(e){
	var angle = Math.floor(Math.random() * 4) * 90;
	e.target.style.transform = "rotate(" + angle + "deg)";
});

$(".contentImg").mouseleave(function(e){
	e.target.style.transform = "rotate(0deg)";
});

////

function wrapWords(){
	$.each($(".rainText"), function(index, data){
		var text = data.innerHTML;
		data.innerHTML = "";
		var last = 0;
		
		for(var i = 0; i < text.length; i++){
			if(text.charAt(i) == " " || i == text.length - 1){
				var word = text.substring(last, i);
				var outer = document.createElement("div");
				var elem = document.createElement("div");
				
				if(i < text.length-2) word += "&nbsp;";
				
				elem.innerHTML = word;
				
				outer.classList.add("rainCarriage");
				elem.classList.add("rainTramInactive");
				
				outer.appendChild(elem);
				$(elem).mouseover(function(e){
					e.target.classList.add("rainTramActive");
					e.target.classList.remove("rainTramInactive");
				});
				
				data.appendChild(outer);
				var last = i+1;
			}
		}
	});
}

function updateWords(){
	$.each($(".rainTramActive"), function(index, data){
		var height = parseInt(data.style.top) || 0;
		var vel = parseInt(data.getAttribute("data-vel")) || 0;
		vel += rainAccel;
		
		var angle = parseInt(data.style.transform.substring(7)) || 0;
		
		data.style.transform = "rotate(" + (angle + wordTilt) + "deg)";
		data.style.top = height + vel + "px";
		data.setAttribute("data-vel", vel);
	});
}

////////////////

function updateButtons(){
	$.each($(".buttoncarrier"), function(index, carrier){
		var tram = carrier.children[0];
		var height = tram.clientHeight;
		var width = tram.clientWidth;
		var o = getCenterOffset(carrier);
		
		if(o.y < height/2 + buttonTramBuffer && within(o.x, width + buttonTramBuffer*2)){
			tram.style.top = Math.min(0, o.y - height/2 - buttonTramBuffer) + "px";
		} else{
			tram.style.top = 0;
		}
	});
}

////////////////

function addPacman(){
	var pac = document.createElement("img");
	pac.src = "media/pacman.gif";
	pac.classList.add("turtle");
	pac.style.top = Math.random() * window.innerHeight + "px";
	pac.style.left = Math.random() * window.innerWidth + "px";
	pac.setAttribute("data-velX", 0);
	pac.setAttribute("data-velY", 0);
	pac.setAttribute("width", pacManSize);
	pac.setAttribute("height", pacManSize);
	$("body")[0].appendChild(pac);
}

function updatePacman(){
	$.each($(".turtle"), function(index, data){
		var weight = data.getAttribute("data-weight");
		var distX = getCenterOffset(data).x;
		var distY = getCenterOffset(data).y;
		
		var diag = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
		
		var xInc = Math.sin(distX / diag) || 0;	//Is sometimes NaN, just toss it then
		var yInc = Math.sin(distY / diag) || 0;

		var velX = parseFloat(data.getAttribute("data-velX"));
		var velY = parseFloat(data.getAttribute("data-velY"));
		
		velX = approach(velX + xInc * turtleAccel, 0, turtleDecay) + (Math.random() * turtleRand - turtleRand / 2);	//Accelerate
		velY = approach(velY + yInc * turtleAccel, 0, turtleDecay) + (Math.random() * turtleRand - turtleRand / 2);
		
		var ratio = Math.min(1.0, turtleLimit / pyth(velX, velY));	//Is it too fast?
		
		velX *= ratio;	//If so, reduce the overall vector by that ammount
		velY *= ratio;
		
		data.style.left = parseInt(data.style.left) + velX + "px";
		data.style.top = parseInt(data.style.top) + velY + "px";
		
		data.setAttribute("data-velX", velX);
		data.setAttribute("data-velY", velY);
		
		////////

		var heading = (-Math.atan(distY / distX) * 180) / Math.PI;
		if(distX < 0) heading += 180;
		if(distX >= 0 && distY >= 0) heading += 360;
		
		$(data).css("transform", "rotate(" + -heading + "deg)");
	});
}

////////////////

function pyth(a, b){
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function getCenterOffset(elem){
	var x = Math.floor(mouse.x - ($(elem).offset().left + parseInt($(elem).css("width"))/2));
	var y = Math.floor(mouse.y - ($(elem).offset().top + parseInt($(elem).css("height"))/2));
	
	return {y, x};
}

function within(val, x){
//	console.log("Value: " + val + " Limit: +/-" + x/2);
	if(val >= -x/2 && val <= x/2){
//		console.log("Within");
		return true;
	}
	return false;
}

function sign(val){
	if(val > 0) return 1;
	if(val < 0) return -1;
	return 1;	//error case
}

function map(x, in_min, in_max, out_min, out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function signs(val){
	if(val > 0){
		return 1;
	}
	if(val < 0){
		return -1;
	}
	return 0;
}

function bound(val, a, b){
	if(a < b){
		if(val < a) return a;
		if(val > b) return b;
	}
	
	if(val < b) return b;
	if(val > a) return a;
	
	return val;
}

function bound(val, a){
	if(val < 0){
		var c = -val;
		return Math.min(Math.max(val, -a), a);
	}
	
	return Math.max(-a, Math.min(a, val));
}

function approach(val, target, increment){
	if(val < target){
		val += increment;
		if(val >= target) return target;
	} else{
		val -= increment;
		if(val <= target) return target;
	}
	
	return val;
}