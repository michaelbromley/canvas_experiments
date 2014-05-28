/**
 * Created by Michael on 25/05/14.
 */

(function(examples) {
    var timer;

    var example = function(context) {
        var canvasWidth = context.canvas.width;
        var canvasHeight = context.canvas.height;
        var incrementer = 0;
        var mouseX, mouseY;

        context.strokeStyle = "rgba(100,100,100,0.3)";
        context.lineWidth = 1;

        var paths = makePaths(50);

        function draw() {
            context.fillStyle = "rgba(255,255,255,1)";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            context.beginPath();
            for (var i = 0; i < paths.length; i ++) {
                var points = paths[i].points;
                for(var point = 0; point < points.length; point++) {
                    var coords = points[point].getCoordinates(incrementer, mouseX, mouseY);
                    context.lineTo(coords.x, coords.y);
                    context.stroke();
                    context.beginPath();
                    context.moveTo(coords.x, coords.y);
                }
            }
            //context.stroke();

            incrementer += 0.005;
            timer = requestAnimationFrame(draw);
        }

        function makePaths(numberOfPaths) {
            var paths = [];
            for (var i = 0; i < numberOfPaths; i++) {
                paths.push(new Path(75));
            }
            return paths;
        }

        function Path(numberOfPoints) {
            var points = [];
            var lastX, lastY;
            var xTrend = Math.random();
            var yTrend = Math.random();
            for (var i = 0; i < numberOfPoints; i++) {
                var next = getNextPoints(lastX, lastY);
                points.push(new Point(next.x, next.y));
                lastX = next.x;
                lastY = next.y;
            }
            this.points = points;

            function getNextPoints(lastX, lastY) {
                lastX = lastX === undefined ? Math.random() * canvasWidth : lastX;
                lastY = lastY === undefined ? Math.random() * canvasHeight : lastY;
                var newX = lastX + (Math.random() - xTrend) * 20;
                var newY = lastY + (Math.random() - yTrend) * 20;

                if (canvasWidth < newX || newX < 0) {
                    xTrend *= -1;
                }
                if (canvasHeight < newY || newY < 0) {
                    yTrend *= -1;
                }
                return {
                    x: newX,
                    y: newY
                };
            }
        }

        function Point(x, y) {
            this.x = x;
            this.y = y;
            this.startingAngle = Math.random() * 100;
            this.radius = Math.random() * 50;
            this.rotationSpeed = Math.random() * 5;
            this.direction = Math.random() < 0.5 ? -1 : 1;
        }
        Point.prototype.getCoordinates = function(val, mouseX, mouseY) {
            var range = 100;
            var self = this;
            val = val * this.direction; // rotate clockwise or anti-clockwise?

            var adjusted = adjustByMousePosition(mouseX, mouseY);

            var newX = Math.sin(this.startingAngle + val * adjusted.rotationSpeed) * adjusted.radius + adjusted.x;
            var newY = Math.cos(this.startingAngle + val * adjusted.rotationSpeed) * adjusted.radius + adjusted.y;
            return {
                x: newX,
                y: newY
            };

            function adjustByMousePosition(mouseX, mouseY) {
                var adjustedX = self.x;
                var adjustedY = self.y;
                var adjustedRadius = self.radius;
                var adjustedRotationSpeed = self.rotationSpeed;
                // if within influence of mouse, move towards it
                var deltaX = self.x - mouseX;
                var deltaY = self.y - mouseY;
                var proximityToMouse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (proximityToMouse <= range) {
                    adjustedX = mouseX + deltaX/2;
                    adjustedY = mouseY + deltaY/2;
                    adjustedRadius = 1 * range / proximityToMouse;
                    adjustedRotationSpeed *= 10;
                }

                return {
                    x: adjustedX,
                    y: adjustedY,
                    radius: adjustedRadius,
                    rotationSpeed: adjustedRotationSpeed
                };
            }
        }

        draw();

        // handler to update mouse coordinates
        $("#canvas").on('mousemove', function(e){
            var offset = $(this).offset();
            //or $(this).offset(); if you really just want the current element's offset
            mouseX = e.pageX - offset.left;
            mouseY = e.pageY - offset.top;
        });
    };

    var destructor = function() {
        cancelAnimationFrame(timer);
    };

    examples.push({
        name: 'optimizing by grouping draw commands',
        code: example,
        destructor: destructor
    });

})(examples);