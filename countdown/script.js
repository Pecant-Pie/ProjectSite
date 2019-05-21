var target = new Date("June 6, 2019 12:00:00");

function doStuff(){
    var d = new Date(target - new Date());
    var t = d.getDate() + "d " + d.getHours() + "h " + d.getMinutes() + "m " + d.getSeconds() + "s";
    $("#counter").text("June 6, 2019 - " + t);
}

doStuff();

setInterval(doStuff, 1000);
