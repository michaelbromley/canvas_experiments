/**
 * Created by Michael on 24/05/14.
 */

var example = function(context) {

    var x = 0;
    var y = 150;
    var canvasWidth = context.canvas.width;
    var canvasHeight = context.canvas.height;
    context.fillStyle = "rgba(231, 46, 133, 0.5)";

    function draw(){
        context.fillRect(x, y, 20, 20);

        if (x < canvasWidth) {
            x += 5;
        } else {
            x = 0;
        }
    }

    timer = setInterval(draw, 16.6);

}



var examples = examples || [];
examples.push({'animating other properties': example});


