var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");



// function createCanvas (x, y, width, height){
//     this.x = x;
//     this.y = y;
//     this.style.width = width;
//     this.style.height= height;
// }

// function height(){
//     return screen.height + 'px';
// }
// function raft (){
//     return screen.width + 'px';
// }

var keys = [];
window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
});

var player;
var raindrops = [];

function update (){
    player.update();
    for (var i = 0; i < raindrops.length; i++){
        raindrops[i].update(i);
    }
}

function render (){
    context.clearRect(0,0,800,480);
    player.render();
    for (var i = 0; i < raindrops.length; i++){
        raindrops[i].render()
    }
    requestAnimationFrame(render);
}

function init(){
    var fire = new Image();
    fire.src = "pics/fire.png";
    player = new Player(0, canvas.height - 100, 64, 64, fire);

    var rain = new Image();
    rain.src = "pics/rain.png";
    setInterval(function () {
        raindrops.push(new Entity(Math.random() * (800 - 20), -32, 30, 40, rain));
    }, 200);

    setInterval(update, 1000 / 60);
    requestAnimationFrame(render);
}

function Player(x, y, width, height, sprite) {
    var e = new Entity(x, y, width, height, sprite);

    e.update = function() {
        //A
        if(keys[65]) e.x-= 5;
        //D
        if(keys[68]) e.x+= 5;

        //for(var i = 0; i < raindrops.length; i++) {
        //    if(e.collision(raindrops[i])) e.die();
        //}
    };

    return e;
}

function Entity(x, y, width, height, sprite){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //this.color = color;
    this.sprite = sprite;

    this.update = function (i){
        this.y += 4;
        if (this.y > canvas.height){
            raindrops.splice(i , 1);

        }
    };

    this.render = function () {
        //context.fillStyle = this.color;
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}

init();


