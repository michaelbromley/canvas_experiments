/**
 * Created by Michael on 25/05/14.
 */
(function(examples) {
    var timer;

    var example = function(context) {
        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var incrementer = 0;
        context.lineWidth = 1;

        function draw() {
            context.fillStyle = "rgba(0,0,0,0.2)";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            for (var i = 0; i < 1000; i++) {
                var distanceFromCentre = i/2;
                var x = Math.sin(incrementer * i/10000) * distanceFromCentre + canvasWidth / 2;
                var y = Math.cos(incrementer * i/10000) * distanceFromCentre + canvasHeight / 2;
                var hue = (incrementer + i) / 3;
                context.fillStyle = "hsla(" + hue + ", 100%, 50%, 0.7)";

                context.beginPath();
                context.arc(x, y, 2, 0, 2 * Math.PI, false);
                context.fill();

                incrementer += 0.01;
            }
            timer = requestAnimationFrame(draw);
        }

        draw();
    };

    var destructor = function() {
        cancelAnimationFrame(timer);
    };

    examples.push({
        name: 'optimizing with requestAnimationFrame',
        code: example,
        destructor: destructor
    });
})(examples);