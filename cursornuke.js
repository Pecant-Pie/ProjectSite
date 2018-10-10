var cursors = ["alias", "all-scroll", "auto", "cell", "context-menu", "col-resize", "copy", "crosshair", "default", "e-resize", "ew-resize", "help", "move", "n-resize", "ne-resize", "nesw-resize", "ns-resize", "nw-resize", "nwse-resize", "no-drop", "none", "not-allowed", "pointer", "progress", "row-resize", "s-resize", "se-resize", "sw-resize", "text", "w-resize", "wait", "zoom-in", "zoom-out"];

document.getElementById("startButton").addEventListener("click", setSpam);
document.getElementById("stopButton").addEventListener("click", unSetSpam);

var repeat;

function setSpam(){
    repeat = setInterval(doStuff, 15);
    console.log("o shit");
}

function unSetSpam(){
    clearInterval(repeat);
    document.getElementsByTagName("html")[0].style.cursor = "default";
    console.log("jk");
}

function doStuff(){
    var selection = cursors[Math.round(Math.random() * cursors.length)];
    document.getElementsByTagName("html")[0].style.cursor = selection;
}


///
var mode;
document.getElementById("setClick").addEventListener("click", function(){
    mode = "click";
});

document.getElementById("setMove").addEventListener("click", function(){
    mode = "move";
});



////

var clickEvent;
var imgInterval;
var isMoving = false;


document.getElementsByTagName("html")[0].addEventListener("click", function(event){
    if(mode == "click"){
        if(!isMoving){
            imgInterval = setInterval(doMove, 1000/60);
        }
        clickEvent = event;
    }
});
document.getElementsByTagName("html")[0].addEventListener("mousemove", function(event){
    if(mode == "move"){
        if(!isMoving){
            imgInterval = setInterval(doMove, 1000/60);
        }
        clickEvent = event;
    }
});

var img = document.getElementById("floatingImg");

img.style.height = "30px";
img.style.width = "60px";
img.style.textAlign = "center";
img.style.position = "fixed";
img.src = "images/arrow.png";
img.style.pointerEvents = "none";

var imgY = window.innerHeight/2;
var imgX = window.innerWidth/2;

//immediately set the position to the center
img.style.top = "" + imgY  - parseInt(img.style.height)/2 + "px";
img.style.left = "" + imgX  - parseInt(img.style.width)/2 + "px";

var accel = 0.02;    //px movement per px dist.
var stopT = 1; //stop moving threshold

function doMove(){
    imgY += (clickEvent.clientY - imgY) * accel;
    imgX += (clickEvent.clientX - imgX) * accel;

    if(Math.abs(imgX - clickEvent.clientX) < stopT && Math.abs(imgY - clickEvent.clientY) < stopT){
        clearInterval(imgInterval);
        //        console.log("Done");
        isMoving = false;
        imgX = clickEvent.clientX;
        imgY = clickEvent.clientY;
    } else{
        //        console.log("Moving...");
        isMoving = true;
    }

    img.style.top = "" + imgY  - parseInt(img.style.height)/2 + "px";
    img.style.left = "" + imgX  - parseInt(img.style.width)/2 + "px";
}

var angle = 0;

setInterval(changeAngle, 1000/60);

function changeAngle(){
    img.style.transform = "rotate(" + (angle+=10) + "deg)";
}