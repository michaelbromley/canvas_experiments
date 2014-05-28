/**
 * Created by Michael on 24/05/14.
 */

(function(examples) {

    var example = function(context) {

        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var incrementer = 0;
        var squareSize = 50;
        var speed = 1;

        // input
        var mouseX, mouseY;

        var squares = makeSquares(squareSize);

        function draw(){
            for (var i = 0; i < squares.length; i ++) {
                squares[i].draw(incrementer, mouseX, mouseY);
            }
            incrementer += speed;
        }
        timer = setInterval(draw, 16.6);

        function makeSquares(squareSize) {
            var squares = [];

            for (var row = 0; row < canvasHeight/squareSize; row ++) {
                for (var col = 0; col < canvasWidth/squareSize; col ++) {
                    var x = col * squareSize;
                    var y = row * squareSize;
                    squares.push(new Square(x, y, squareSize));
                }
            }

            return squares;
        }

        function Square(x, y, squareSize) {
            var _x = x;
            var _y = y;
            var _size = squareSize;
            var colourOffset = Math.random() * 360;
            var lightness = 10;
            return {
                draw: function(incrementer, mouseX, mouseY) {
                    // is the mouse over this square?
                    if (_x <= mouseX && mouseX <= _x + _size &&
                        _y <= mouseY && mouseY <= _y + _size) {
                        lightness = 100;
                    }
                    var hue = incrementer + colourOffset;
                    context.fillStyle = "hsl(" + hue + ", 100%, " + lightness + "%)";
                    context.fillRect(_x, _y, _size, _size);

                    if (10 < lightness) {
                        lightness -= 1;
                    }
                }
            }
        }

        // handler to update mouse coordinates
        $("#canvas").on('mousemove', function(e){
            var offset = $(this).offset();
            //or $(this).offset(); if you really just want the current element's offset
            mouseX = e.pageX - offset.left;
            mouseY = e.pageY - offset.top;
        });
    }

    examples.push({
        name: 'responding to input',
        code: example
    });

})(examples);