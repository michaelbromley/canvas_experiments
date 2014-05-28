
var examples = examples || [];
var currentExample = {};

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
        name = examples[i].name;
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
    if (currentExample.destructor) {
        currentExample.destructor();
    }
    context.beginPath();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function loadExample(context) {
    var fn;
    var code;
    currentExample = examples[$("#selector").val()];
    if (currentExample) {
        fn = currentExample.code;
        fn(context);
        code = stripAngleBrackets(fn);
        $("#code").html(code);
    }
}

function stripAngleBrackets(string) {
    return string.toString().replace(/[<>]/g, function(m){
        return {
            '<' : '&lt;',
            '>' : '&gt;'
        }[m];
    });
}

