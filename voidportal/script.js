
var maxS = Math.min(window.innerHeight, window.innerWidth);
var num = 50;
var angle = 0;

var latest = document.createElement("div");
latest.classList.add("node");


for(var x = 0; x < num; x++){
	var c = HSVtoRGB(x / num, 1, 1);
	
	var n = document.createElement("div");
	n.classList.add("node");
	n.style.height = (maxS * x/num) + "px";
	n.style.width = n.style.height;
	
	$(n).css("background-color", "rgb(" + c.r + "," + c.g + "," + c.b + ")");
	
	n.append(latest);
	latest = n;
}

$("body").append(latest);

setInterval(rot, 16);

function rot(){
	$(".node").each(function(index, data){
		
		
		$(data).css("transform", "rotate(" + angle + "deg)");
		
//		console.log($(data).css("transform"));
	});
	angle += 0.01;
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