let logo = $("#bigLogo");
let s = 200;
let height = 700;

$("#descriptionCol").hide();

setTimeout(function(){
	logo.animate({
		width: s,
		height: s
	}, 750, "swing", function(){

		$("#bigLogo").fadeTo(750, 0);

		$("#rollBar").animate({
			marginTop: height,
		}, 750, "swing", function(){
			$("#descriptionCol").fadeTo(750, 1);
		});
	});
}, 250);
