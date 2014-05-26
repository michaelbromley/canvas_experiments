/**
 * Created by Michael on 24/05/14.
 */

var example = function(context) {

    var canvasWidth = context.canvas.width;
    var canvasHeight = context.canvas.height;
    var incrementer = 0;

    function draw(){
        context.fillStyle = "hsl(" + incrementer + ", 100%, 50%)";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        incrementer += 0.5;
    }
    timer = setInterval(draw, 16.6);

}



var examples = examples || [];
examples.push({
    name: 'animating colour 1',
    code: example
});



/*
 var squareSize = 50;
 var stagger = 0;
 for (var row = 0; row < canvasHeight/squareSize; row ++) {
 for (var col = 0; col < canvasWidth/squareSize; col ++) {
 var val = stagger + incrementer;
 context.fillStyle = "hsl(" + val + ", 100%, 50%)";
 var x = col * squareSize;
 var y = row * squareSize;
 context.fillRect(x, y, squareSize, squareSize);
 stagger += 5;
 }
 }
 */