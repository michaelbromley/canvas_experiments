/**
 * Created by Michael on 23/05/14.
 */

var example = function(context) {
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(500, 100);
    context.stroke();
}



var examples = examples || [];
examples.push({
    name: 'a line',
    code: example
});