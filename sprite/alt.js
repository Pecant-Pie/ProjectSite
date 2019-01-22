let logo = $("#bigLogo");
let h = 200;

$("#descriptionCol").hide();

setTimeout(function(){
	logo.animate({
		width: h,
		height: h
	}, 750, "swing", function(){
		let height = 400;
		$("#rollBar").animate({
			marginTop: height,
		}, 750, "swing", function(){
			$("#descriptionCol").show();
		});
	});
}, 250);
