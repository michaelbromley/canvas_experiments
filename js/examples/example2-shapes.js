/**
 * Created by Michael on 24/05/14.
 */
(function(examples) {

    var example = function(context) {
        context.strokeStyle = 'green';
        context.lineWidth = 3;
        context.fillStyle = '#ccf';

        // rectangle - pretty simple
        context.rect(10, 10, 200, 100);
        context.fill();
        context.stroke();

        // circle - a bit more involved
        var radius = 50;
        var startAngle = 0;
        var endAngle = 2 * Math.PI;

        context.beginPath();
        context.arc(400, 100, radius, startAngle, endAngle, false);
        context.fill();
        context.stroke();

        // other polygons - a bit painful!
        context.beginPath();
        context.moveTo(10, 250);
        context.lineTo(60, 150);
        context.lineTo(110, 250);
        context.closePath();
        context.fill();
        context.stroke();
    };

    examples.push({
        name: 'shapes',
        code: example
    });

})(examples);