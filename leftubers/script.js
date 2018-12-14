$("#searchButton").click(function(){
	alert("Invalid ZIP code.");
});

$(".downloadBadge").click(function(){
	window.top.location = "https://bitly.com/98K8eH";
});

$("#altButton").click(function(){
	window.top.location = "alt.html";
});


//Header Easing
setTimeout(function(){
	$("#navContainer").animate({
		top: "0px"
	}, 500, function(){
		console.log("done 1");
	});
}, 500);
