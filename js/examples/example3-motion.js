/**
 * Created by Michael on 24/05/14.
 */

(function(examples) {
    var timer;

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

        timer = setInterval(draw, 1000/60);
    };

    var destructor = function() {
        clearInterval(timer);
    };

    examples.push({
        name: 'simple motion',
        code: example,
        destructor: destructor
    });

})(examples);



/*

 context.clearRect(0, 0, canvasWidth, canvasHeight);

 y = (Math.sin(x/25) *20) + 150;


 */