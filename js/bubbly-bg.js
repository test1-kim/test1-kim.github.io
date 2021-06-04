

var circles = [],
    canvas = document.getElementById("canvas1"),
    context = canvas.getContext("2d"),

    // SETTINGS

    opacity = 1,                     // the opacity of the circles 0 to 1
    colors = ['rgba(255, 255, 255,' + opacity + ')',       // an array of rgb colors for the circles
    'rgba(42, 167, 255,' + opacity + ')',
    'rgba(252, 188, 15,' + opacity + ')',
    'rgba(255, 242, 66,' + opacity + ')',
    'rgba(248, 95, 54,' + opacity + ')',
    'rgba(255, 255, 255,' + opacity + ')',
    'rgba(27, 27, 27,' + opacity + ')'
   ],
    imgs = ['url("./img/002.png")',       // an array of rgb colors for the circles
            'url("./img/003.png")',
            'url("./img/004.png")'
             ],
    minSize = 0.1,                                        // the minimum size of the circles in px
    maxSize = 1,                                       // the maximum size of the circles in px
    numCircles = 100,                                   // the number of circles
    minSpeed = -3.5,                                     // the minimum speed, recommended: -maxspeed
    maxSpeed = 3.5,
    expandState = true;                                      // the direction of expansion

    var img1 = new Image();
    img1.src = "./img/002.png";
    var img2 = new Image();
    img2.src = "./img/003.png";
    var img3 = new Image();
    img3.src = "./img/004.png";
    imgs = [
            img1,
            img2,
            img3
        ]

function buildArray() {
    'use strict';

    for (var i =0; i < numCircles ; i++){
        var left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
            top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
            size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
            leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
            color = Math.floor(Math.random() * (colors.length - 1 + 1)) + 1,
            img = Math.floor(Math.random() * (imgs.length - 1 + 1)) + 1,
            expandState = expandState;

            while(leftSpeed == 0 || topSpeed == 0){
                leftSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10,
                topSpeed = (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed)/10;
            }
        var circle = {color:color, left:left, top:top, size:size, leftSpeed:leftSpeed, topSpeed:topSpeed, expandState:expandState, img:img };
        circles.push(circle);
    }
}

function build(){
    'use strict';

    for(var h = 0; h < circles.length; h++){
        var curCircle = circles[h];
        context.fillStyle = colors[curCircle.color-1];
        //var pattern = context.createPattern(imgs[curCircle.color-1], 'no-repeat');
        //context.fillStyle = pattern;
        //context.fillStyle = imgs[curCircle.img-1];
        //context.drawImage = imgs[curCircle.img-1];
        context.beginPath();
        if(curCircle.left > canvas.width+curCircle.size){
            curCircle.left = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else if(curCircle.left < 0-curCircle.size){
            curCircle.left = canvas.width+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.left = curCircle.left+curCircle.leftSpeed;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        if(curCircle.top > canvas.height+curCircle.size){
            curCircle.top = 0-curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);

        }else if(curCircle.top < 0-curCircle.size){
            curCircle.top = canvas.height+curCircle.size;
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }else{
            curCircle.top = curCircle.top+curCircle.topSpeed;
            if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == false){
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size != maxSize && curCircle.size != minSize && curCircle.expandState == true){
              curCircle.size = curCircle.size+0.1;
            }
            else if(curCircle.size == maxSize && curCircle.expandState == true){
              curCircle.expandState = false;
              curCircle.size = curCircle.size-0.1;
            }
            else if(curCircle.size == minSize && curCircle.expandState == false){
              curCircle.expandState = true;
              curCircle.size = curCircle.size+0.1;
            }
            context.arc(curCircle.left, curCircle.top, curCircle.size, 0, 2 * Math.PI, false);
        }

        context.closePath();
        context.fill();
        context.ellipse;
    }
}


var xVal = 0;

window.requestAnimFrame = (function (callback) {
    'use strict';
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

function bly_animate() {
    'use strict';
    var canvas = document.getElementById("canvas1"),
        context = canvas.getContext("2d");

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    // draw the next frame
    xVal++;
    build();

    //console.log("Prep: bly_animate ==> requestAnimFrame");
    // request a new frame
    requestAnimFrame(function () {
        bly_animate();
    });
}
window.onload = function () {
    'use strict';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildArray();
    bly_animate();
};


window.onresize = function () {
    'use strict';
    console.log("resize");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //buildArray();
    bly_animate();
};