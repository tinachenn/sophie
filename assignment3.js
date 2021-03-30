var canvas;
var ctx;
var w = 1000;
var h = 600;
var allCircles = [];
var oneDegree = 2*Math.PI/360;

var o1 = {
    "x": w/2,
    "y": h/2,
    "w": 20,
    "h": 20,
    "c": 260,
    "a": 0.5,
    "angle": 0,
    "changle": 30,
    "distance": 50,
 }
 var o2 = {
    "x": w,
    "y": h,
    "w": 20,
    "h": 20,
    "c": 200,
    "a": 0.5,
    "angle": 0,
    "changle": 10,
    "distance": 100,
}



setUpCanvas();

createData(60);
animationLoop();



function animationLoop(){
    clear();
    
    circlesDrawUpdate(allCircles);
    line(o1);
    sideOne(o1);
    sideTwo(o1)
    middle(o1);
    angle(o1,10);
    forward(o2,10);
    requestAnimationFrame(animationLoop)
}



function line(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    for(var i=0; i<40; i++){
        angle(o,50);
        forward(o,90+i*40);
        ctx.lineTo(o.x,o.y);
        ctx.stroke();
    }
    o.x = x;
    o.y = y;
    o.angle = a;
}




function middle(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    for(var i=0; i<20; i++){
        angle(o,30);
        forward(o,+i*5);
        ctx.lineTo(o.x,o.y);
        ctx.fill();
    }
    o.x = x;
    o.y = y;
    o.angle = a;
}


function sideOne(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    ctx.beginPath();
    ctx.moveTo(o.x/100, o.y);
    for(var i=0; i<10; i++){
        angle(o,50);
        forward(o,+i*5);
        ctx.lineTo(o.x,o.y);
        ctx.fill();
    }
    o.x = x;
    o.y = y;
    o.angle = a;
}

function sideTwo(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    ctx.beginPath();
    ctx.moveTo(o.x*2, o.y);
    for(var i=0; i<10; i++){
        angle(o,50);
        forward(o,+i*5);
        ctx.lineTo(o.x,o.y);
        ctx.fill();
    }
    o.x = x;
    o.y = y;
    o.angle = a;
}



function angle(o,a){
    console.log(a);
    if(a == undefined){
        o.angle+=o.changle;
    }else{
        o.angle+=a;
    }
}

function forward(o,d){
    var cx;
    var cy;
    if(d != undefined){
        o.distance = d;
    };
        cx = o.distance*Math.cos(o.angle*oneDegree);
        cy = o.distance*Math.sin(o.angle*oneDegree);
        o.x += cx;
        o.y += cy;
}



function circlesDrawUpdate(a){
    for(var i=0; i<a.length; i++){   
        circle(a[i]);
        updateData(a[i]);
    }  
}


function createData(num){
    for(var i=0; i<num; i++){   
        allCircles.push({
            "x": w/num*i,
            "y": h,
            "dx": randn(0),
            "dy": 2+rand(3),
            "r": 10+rand(20),
            "c": 200+rand(80),
            "a": 0.4,
            "da": 0,
        })
    }
}


function updateData(o){
    var i;
    o.x += o.dx;
    o.y += o.dy;
    o.a -= o.da;
    tyroidal(o);
}

function tyroidal(o){
    if(o.x > w){
        o.x = 0;
    };
    if(o.x < 0 ){
        o.x = w;
    };
    if(o.y > h){
        o.y = 0;
    }
    if(o.y < 0){
        o.y = h;
    }
}   
function clear(){
    ctx.clearRect(0,0,w,h);
}



function rect(o){
    var x = o.x;
    var y = o.y;
    o.x = o.x-o.w/2;
    o.y = o.y-o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x+o.w, o.y);
    ctx.lineTo(o.x+o.w, o.y+o.h);
    ctx.lineTo(o.x, o.y+o.h);
    ctx.lineTo(o.x, o.y);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
    o.x = x;
    o.y = y;
}

function circle (o){
    ctx.beginPath();
    ctx.arc(o.x,o.y,o.r,0, 2*Math.PI);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
}

function randn(r){
    var result = Math.random()*r - r/2;
    return result
}

function randi(r){
    var result = Math.floor(Math.random()*r)
    return result
}

function rand(r){
    return Math.random()*r
}

function setUpCanvas(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "5px solid black"
}


console.log("Assignment 8: Animation");