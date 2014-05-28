/**
 * Created by Michael on 25/05/14.
 */
(function(examples) {
    var timer;

    var example = function(context) {
        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var seconds = 0;
        var frames = 0;
        context.strokeStyle = "#555";
        context.lineWidth = 2;

        function draw() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            context.font = "200px arial";
            context.fillText(seconds, 100, 200);

            context.font = "100px arial";
            var framesPadded = function() {
                return frames < 10 ? "0" + frames: frames;
            }
            context.fillText(framesPadded(), 350, 200);

            frames ++;
            if (60 <= frames) {
                seconds ++;
                frames = 0;
            }
            //timer = requestAnimationFrame(draw);
            timer = setTimeout(draw, 16.666);
        }

        draw();
    };

    var destructor = function() {
        cancelAnimationFrame(timer);
        clearTimeout(timer);
    }

    examples.push({
        name: 'optimizing with requestAnimationFrame',
        code: example,
        destructor: destructor
    });
})(examples);