/**
 * Created by Michael on 24/05/14.
 */

(function(examples) {
    var timer;

    var example = function(context) {

        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var incrementer = 0;
        var squareSize = 50;
        var speed = 1;

        var squares = makeSquares();

        function draw(){
            for (var i = 0; i < squares.length; i ++) {
                squares[i].draw(incrementer);
            }
            incrementer += speed;
        }
        timer = setInterval(draw, 1000/60);

        function makeSquares() {
            var squares = [];

            for (var row = 0; row < canvasHeight/squareSize; row ++) {
                for (var col = 0; col < canvasWidth/squareSize; col ++) {
                    var x = col * squareSize;
                    var y = row * squareSize;
                    squares.push(new Square(x, y));
                }
            }

            return squares;
        }

        function Square(x, y) {
            var _x = x;
            var _y = y;
            var colourOffset = Math.random() * 360;
            return {
                draw: function(incrementer) {
                    var hue = incrementer + colourOffset;
                    context.fillStyle = "hsl(" + hue + ", 100%, 50%)";
                    context.fillRect(_x, _y, squareSize, squareSize);
                }
            }
        }
    };

    var destructor = function() {
        clearInterval(timer);
    };

    examples.push({
        name: 'animating colour 2',
        code: example,
        destructor: destructor
    });

})(examples);