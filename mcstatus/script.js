$("#ping").click(function(){
	$("#output").empty();
	$("#imgContainer").empty();
	$.getJSON("https://mcapi.us/server/status?ip=" + ($("#ip").val() || $("#ip").attr("placeholder")), function(data){
		$("#output").append(newStat("Status: ", data.online? "ONLINE" : "OFFLINE"));
		$("#output").append(newStat("MOTD: ", data.motd));
		$("#output").append(newStat("Players: ", data.players.now + "/" + data.players.max));
		$("#output").append(newStat("Version: ", data.server.name));

		var img = new Image();
		img.src = data.favicon;
		img.classList.add("favicon");
		$("#imgContainer").append(img);

	});
});

$("#ping").click();

function newStat(nameValue, valueValue){
	var name = $(document.createElement("div"));
	name.addClass("statName");
	name.text(nameValue);

	var value = $(document.createElement("div"));
	value.addClass("statValue");
	value.text(valueValue);

	var elem = $(document.createElement("div"));
	elem.addClass("statItem");
	elem.append(name);
	elem.append(value);
	return elem;
}
