for(var i = 30; i >= 0; i--){
	createSquare(15 * i, i / 20.0, randColor());
}

setInterval(updateSquares, 20);

function createSquare(size, rot, color){
	var sq = document.createElement("div");
	sq.style.display = "block";
	sq.style.position = "absolute";
	sq.style.backgroundColor = color;
	sq.style.width = size + "px";
	sq.style.height = size + "px";
	sq.style.top = "50%";
	sq.style.left = "50%";
	
	sq.classList.add("square");
	sq.style.transform = "rotate(0)";
	
	sq.setAttribute("data-rot", rot);
	
	sq.style.margin = "-" + (size/2) + "px 0px 0px -" + (size/2) + "px";
	
	document.getElementsByTagName("body")[0].appendChild(sq);
}

function updateSquares(){
	$.each($(".square"), function(index, value){
		var angle = parseFloat(value.style.transform.substring(7));
		angle += parseFloat(value.getAttribute("data-rot"));
		
		if(angle >= 360 || angle <= -360){
			angle = 0;
		}
		value.style.transform = "rotate(" + angle + "deg)";
	});
}

function randColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}