var flame, rain;
var key;

function startGame() {
    flame = new component(10, 10, "red", 10, 134);
    rain = new component(5, 10, "blue", 20, 20);
    myGameArea.start();
}

window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // Left
            //flame.moveLeft();
            break;

        case 38: // Up
            flame.moveUp();
            break;

        case 39: // Right
            //flame.moveRight();
            break;

        case 40: // Down
            flame.moveDown();
            break;
    }
}, false);

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.style.backgroundColor = "black";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 0;
        this.canvas.style.right = 0;
        this.canvas.style.bottom = 0;
        this.canvas.style.left = 0;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1000 / 60);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.fall = function () {
        this.y += 2;

        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //unused
        /*if (Key.isDown(Key.UP)) this.moveUp();
         if (Key.isDown(Key.DOWN)) this.moveDown();*/

        if (Key.isDown(Key.LEFT)) this.moveLeft();
        if (Key.isDown(Key.RIGHT)) this.moveRight();

    };
    this.moveLeft = function() {
        this.x -= 2;
    };

    this.moveRight = function() {
        this.x += 2;
    };

    /*this.moveUp = function() {
     this.y -= 1;
     };

     this.moveDown = function() {
     this.y += 1;
     };*/
}

function updateGameArea() {
    myGameArea.clear();
    flame.update();
    rain.fall();
}

var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

