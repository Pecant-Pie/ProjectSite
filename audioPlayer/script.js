var p = new PlayHead($("#mainPlayer"), [
    {
        name: "airhorn",
        path: "media/reee.wav",
        artworkPath: "media/airhorn.jpg"
    },
    {
        name: "1901",
        path: "media/1901.m4a",
        artworkPath: "media/phoenix.jpeg"
    },
    {
        name: "Last Train to London",
        path: "media/train.m4a",
        artworkPath: "media/elo.jpeg"
    },
    {
        name: "Shakedown",
        path: "media/shakedown.m4a",
        artworkPath: "media/shakedown.jpeg"
    }
]);

////////

function PlayHead(elem, stuff){
    var obj = this;

    this.media = stuff;

    this.index = 0;

    this.barInterval = 0;

    this.player = new Audio();

    obj.player.src = obj.media[0].path;

    this.setBarInterval = function(){
        obj.barInterval = setInterval(function(){
            elem.find(".bar").val(100 * obj.player.currentTime / obj.player.duration);

            if(obj.player.ended){
                obj.next();
            } else{
                if(obj.player.readyState == 4){
                    elem.find(".timeCurrent").text(getClock(obj.player.currentTime));
                    elem.find(".timeTotal").text(getClock(obj.player.duration));
                }
            }

        }, 250);
    }
    this.setBarInterval();

    this.next = function(){
        obj.pause();
        obj.index++;
        if(obj.index >= obj.media.length) obj.index = 0;
        obj.player.src = obj.media[obj.index].path;
        obj.play();
        obj.update();
    }

    this.prev = function(){
        obj.pause();
        obj.index--;
        if(obj.index < 0) obj.index = obj.media.length-1;
        obj.player.src = obj.media[obj.index].path;
        obj.play();
        obj.update();
    }

    this.play = function(){
        obj.player.play();
        var e = elem.find(".play")
        e.text("=");
        e.attr("isPlay", "true");
    }

    this.pause = function(){
        obj.player.pause();
        var e = elem.find(".play")
        e.text(">");
        e.attr("isPlay", "false");
    }

    this.toggle = function(){
        if(elem.find(".play").attr("isPlay") == "true"){
            obj.pause();
        } else{
            obj.play();
        }
    }

    this.update = function(){
        elem.find(".songTitle").text(obj.media[obj.index].name);
        elem.find(".artwork").attr("src", obj.media[obj.index].artworkPath);
    }

    /////////

    elem.find(".bar").change(function(){
        var time = (this.value / 100) * obj.player.duration;
        obj.player.currentTime = time;
    }).mousedown(function(){
        clearInterval(obj.barInterval);
    }).mouseup(function(){
        obj.setBarInterval();
    })

    elem.find(".play").click(function(){
        obj.toggle();
    });
    elem.find(".next").click(function(){
        obj.next();
    });
    elem.find(".prev").click(function(){
        obj.next();
    });

    elem.find(".voli").click(function(){
        obj.player.volume = Math.max(obj.player.volume - .1, 0);
    });

    elem.find(".vold").click(function(){
        obj.player.volume = Math.min(obj.player.volume + .1, 1);
    });

    this.update();
}

function getClock(t){
    let x = Math.floor(t%60);
    return Math.floor(t/60) + ":" + (x < 10 ? ("0" + x) : x);
}
