var vals = {
    "a": [
        1, 0, 2
    ],
    "b": [
        2, 0, 1
    ],
    "c": [
        1, 2, 0
    ],
    "d": [
        2, 1, 0
    ],
    "e": [
        0, 2, 1
    ]
}

var scores = [
    "Worthless",
    "Diabetic",
    "Absolute nobody",
    "Sub-par",
    "Probably single",
    "Unextraordinary",
    "Weak at best",
    "Not awful",
    "Okay",
    "Rather good, actually",
    "Candy Fanatic"
];

$(".optImage").each(function(index, data){
    $(data).click(function(e){
        var elem = $(e.target);
        $("[value='" + elem.attr("data-set") + "']").each(function(index, data){
            data.removeAttribute("checked", "");
        });
        $(".optImage[data-set='" + elem.attr("data-set") + "']").each(function(index, data){
            $(data).removeClass("selected");
        });
        $(elem).addClass("selected");
        $(elem).prev().get(0).setAttribute("checked", "");
    });
});

function calc(){
    var total = 0;
    for(var question in vals){
        var opts = $("[value='" + question + "']");
        for(var optNum = 0; optNum < opts.length; optNum++){
            var succ = opts[optNum].getAttribute("checked");
            if(succ != null){
                total += vals[question][optNum];
            }
        }
    }
    $("#totalBox").text(scores[total]);
}
