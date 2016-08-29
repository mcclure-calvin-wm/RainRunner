var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var entities = [];

function update (){
    for (var i = 0; i < entities.length; i++){
        entities[i].update(i);
    }
}

function render (){
    context.clearRect(0,0,800,480);
    for (var i = 0; i < entities.length; i++){
        entities[i].render()

    }
    requestAnimationFrame(render);
}

function init(){
    var rain = new Image();
    rain.src = "pics/rain.png";


    setInterval(update, 1000 / 60);

    requestAnimationFrame(render);

    setInterval(function (){
        entities.push(new Entity(Math.random() * (800 - 20), -32, 20, 32, rain));
    }, 200);
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
            entities.splice(i , 1);

        }
    };

    this.render = function () {
        //context.fillStyle = this.color;
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}

init();


