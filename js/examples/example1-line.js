/**
 * Created by Michael on 23/05/14.
 */
(function(examples) {

    var example = function(context) {
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(100, 100);
        context.lineTo(500, 100);
        context.stroke();
    };

    examples.push({
        name: 'a line',
        code: example
    });

})(examples);