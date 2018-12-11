console.log("nav ok");

$("#home").click(function(){
	console.log("OK");
	// window.top.location = "index.html";
	window.history.back();
});

$("#alt").click(function(){
	console.log("OK");
	window.top.location = "alt.html";
})
