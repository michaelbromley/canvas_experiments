
var examples = examples || [];
var timer;

$(window).bind("load", function() {
    init();
});

function init() {
    makeSelector();
    registerChangeEvent();
}

function makeSelector() {
    var i;
    var name;
    var select = $("#selector");
    for(i = 0; i < examples.length; i++) {
        name = Object.keys(examples[i])[0];
        $("<option />", {value: i, text: name}).appendTo(select);
    }
}

function registerChangeEvent() {
    var context = $("#canvas")[0].getContext('2d');
    $("#selector").on('change', function() {
        resetContext(context);
        loadExample(context);
    })
}

function resetContext(context) {
    clearInterval(timer);
    context.beginPath();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function loadExample(context) {
    var fn;
    var selectedExample = examples[$("#selector").val()];
    if (selectedExample) {
        fn = selectedExample[Object.keys(selectedExample)[0]];
        fn(context);
    }
}

