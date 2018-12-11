$("#searchButton").click(function(){
	alert("Invalid ZIP code.");
});

$(".downloadBadge").click(function(){
	alert("Error");
});

$("#altButton").click(function(){
	window.top.location = "alt.html";
});

setTimeout(function(){
	$("#navContainer").animate({
		top: "0px"
	}, 500, function(){
		console.log("done 1");
	});
}, 500);
