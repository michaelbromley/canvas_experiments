/**
 * Created by Michael on 25/05/14.
 */

(function(examples) {

    var example = function(context) {

        // set up the audio context
        var audioContext;
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        audioContext = new AudioContext();

        // add an <audio> element to the page which will autoplay
        var audioElement = $('<audio src="assets/04%20Newjack.mp3" controls autoplay></audio>');
        $("#canvas").after(audioElement);

        // create an analyzer that will get the real-time audio data from the <audio> element
        var analyser = audioContext.createAnalyser();
        analyser.fftSize = 64;
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        // designate the <audio> element as the source for our audio data
        var source = audioContext.createMediaElementSource(audioElement[0]);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        // this is the same as the previous examples
        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var incrementer = 0;
        var squareSize = 50;
        var speed = 1;

        var squares = makeSquares(squareSize);

        function draw(){
            // each frame, we re-sample the audio stream and get the frequency values
            analyser.getByteFrequencyData(frequencyData);

            for (var i = 0; i < squares.length; i ++) {
                // we pass this array of frequency values to the draw method
                squares[i].draw(incrementer, frequencyData);
            }
            incrementer += speed;
        }
        timer = setInterval(draw, 16.6);

        function makeSquares(squareSize) {
            var squares = [];
            var squareId = 0;
            for (var row = 0; row < canvasHeight/squareSize; row ++) {
                for (var col = 0; col < canvasWidth/squareSize; col ++) {
                    var x = col * squareSize;
                    var y = row * squareSize;
                    squares.push(new Square(x, y, squareSize, squareId));
                    squareId ++;
                }
            }

            return squares;
        }

        function Square(x, y, squareSize, id) {
            var _id = id;
            var _x = x;
            var _y = y;
            var _size = squareSize;
            var lightness = 10;
            return {
                draw: function(incrementer, frequencyData) {
                    // get the frequency value corresponding to this square's _id
                    // and use it to set the hue and lightness
                    var hue = frequencyData[_id] / 255 * 360;
                    lightness = frequencyData[_id] / 255 * 70;
                    context.fillStyle = "hsl(" + hue + ", 100%, " + lightness + "%)";
                    context.fillRect(_x, _y, _size, _size);

                    if (10 < lightness) {
                        lightness -= 1;
                    }
                }
            }
        }
    };

    examples.push({
        name: 'responding to audio input',
        code: example
    });

})(examples);