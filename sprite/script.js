let logo = $("#bigLogo");

let h = $("#introContainer").height();

let wannas = ["Sprite", "chug", "lemon-lime", "drink", "taste", "sip", "Sprite Cranbery", "refresh"];

buttonDir = 125;

setTimeout(function(){
	logo.animate({
		width: h,
		height: h
	}, 750, "swing", function(){
		setTimeout(function(){
			console.log("done");
		}, 1000);
	});
}, 250);

setInterval(function(){
	var t = null;
	let last = $("#changeText").text();
	// console.log("Last: " + last);
	while(!t || t == last){
		t = wannas[Math.floor(Math.random() * wannas.length)];
	}
	$("#changeText").text(t);
	// console.log(t);
}, 2000);

$("#nextButton").hover(function(){
	$("#nextButton img").finish();
	$("#nextButton img").animate({
		width: 120,
		height: 120,
		marginLeft: -10,
		marginTop: -10,
	}, buttonDir);
}, function(){
	$("#nextButton img").finish();
	$("#nextButton img").animate({
		width: 100,
		height: 100,
		marginLeft: 0,
		marginTop: 0,
	}, buttonDir);
});

$("#nextButton").click(function(){
	window.top.location = "alt.html";
});
