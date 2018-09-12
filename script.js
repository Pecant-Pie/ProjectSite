createSquare();

setInterval(updateSquare, 20);


function createSquare(){
	var sq = document.createElement("div");
	sq.style.display = "block";
	sq.style.position = "absolute";
	sq.style.backgroundColor = "#000";
	sq.style.width = "400px";
	sq.style.height = "400px";
	sq.style.top = "50%";
	sq.style.left = "50%";
	
	sq.id = "square";
	sq.style.transform = "rotate(0)";
	
	sq.style.margin = "-200px 0px 0px -200px";
	
	document.getElementsByTagName("body")[0].appendChild(sq);
}

function updateSquare(){
	var elem = document.getElementById("square");
	var angle = parseInt(elem.style.transform.substring(7));
	console.log("got angle: " + angle);
	angle += 1;
	angle = angle % 360;
	elem.style.transform = "rotate(" + angle + "deg)";
}