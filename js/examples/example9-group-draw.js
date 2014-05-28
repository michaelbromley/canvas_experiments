/**
 * Created by Michael on 25/05/14.
 */

(function(examples) {

    var example = function(context) {

        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        context.strokeStyle = "#555";
        context.lineWidth = 2;

        function draw() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.beginPath();
            for (var i = 0; i < 50; i++) {
                var x = Math.random() * canvasWidth;
                var y = Math.random() * canvasHeight;

                context.lineTo(x, y);
            }
            context.stroke();
            timer = requestAnimationFrame(draw);
        }

        draw();
    };

    examples.push({
        name: 'optimizing by grouping draw commands',
        code: example
    });

})(examples);