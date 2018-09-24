var buttonTramBuffer = 5;

var numPacman = 1;
var turtleAccel = 0.1;	//per render frame

////////////////

$("body").mousemove(function(event){
	updateButtons(event);
	updatePacman(event);
});

function updateButtons(e){
	$.each($(".buttoncarrier"), function(index, carrier){
		var tram = carrier.children[0];
		var height = tram.clientHeight;
		var width = tram.clientWidth;
		var o = getCenterOffset(e, carrier);
		
		if(within(o.y, height + buttonTramBuffer*2) && within(o.x, width + buttonTramBuffer*2)){
			tram.style.top = Math.min(0, o.y - height/2 - buttonTramBuffer) + "px";
		} else{
			tram.style.top = 0;
		}
	});
}

////////////////

for(var i = 0; i < numPacman; i++){
	var pac = document.createElement("img");
	pac.src = "media/pacman.gif";
	pac.classList.add("turtle");
	pac.style.top = Math.random() * window.innerHeight + "px";
	pac.style.left = Math.random() * window.innerWidth + "px";
	pac.setAttribute("data-velX", 0);
	pac.setAttribute("data-velY", 0);
	$("body")[0].appendChild(pac);
}

function updatePacman(e){
	$.each($(".turtle"), function(index, data){
		var velX = parseFloat(data.getAttribute("data-velX"));
		var velY = parseFloat(data.getAttribute("data-velY"));
		
		var distX = getCenterOffset(e, data).x;
		var distY = getCenterOffset(e, data).y;
		
		var diag = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
		
//		var raw = -Math.atan(distY / distX);
//		var heading = (raw * 180) / Math.PI;
//		
//		if(distX < 0){
//			heading += 180;
//		}
//		
//		if(distX >= 0 && distY >= 0){
//			heading += 360;
//		}
		
		var xInc = Math.cos(diag);
		var yInc = Math.sin(diag);
		
//		console.log(distX + "\tx\t" + distY + "\t@\t" + heading);
		
		data.setAttribute("data-velX", velX + xInc * turtleAccel);
		data.setAttribute("data-velY", velY + yInc * turtleAccel);
		
	});
}

////////////////

function pyth(a, b){
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function getCenterDistance(mouseEvent, elem){
	var o = getCenterOffset(mouseEvent, elem);
	return Math.sqrt(Math.pow(o.x, 2) + Math.pow(o.y, 2));
}

function getCenterOffset(mouseEvent, elem){
	var x = Math.floor(mouseEvent.pageX - ($(elem).offset().left + parseInt($(elem).css("width"))/2));
	
	var y = Math.floor(mouseEvent.pageY - ($(elem).offset().top + parseInt($(elem).css("height"))/2));
	
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
	if(val > 0){
		return 1;
	}
	if(val < 0){
		return -1;
	}
	
	return 0;
}

function map(x, in_min, in_max, out_min, out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function signs(val){	//strict, never 0
	if(val > 0){
		return 1;
	}
	return -1;
}

function bound(val, a, b){
	if(a < b){
		var c = a;
		a = b;
		b = c;
	}
	
	return Math.max(b, Math.min(a, val));
}