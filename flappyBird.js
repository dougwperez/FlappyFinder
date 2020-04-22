var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");






// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();


bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


//some variables

var gap = 85;
var constant = pipeNorth.height+gap;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


//Stick

var Stick = function(x, y, name) {
    this.x = x;
    this.y = y; 
    this.name = name;
};

Stick.prototype.draw = function() {
	//??   
};

// random sticks distribution
var verbs = ["run", "jump", "hit", "dance", "draw", "fly", "destory"];
var nouns = ["dog", "boy", "house","farm", "phone", "Plane", "Doctor"];
var sticks = [];
for (var i = 0; i < 20; i++) {  
    sticks.push(new Stick(i * 161 + 250, Math.floor(Math.random() * (400 - 10 + 1)) + 10, nouns[i]));
    sticks.push(new Stick(i * 161 + 200, Math.floor(Math.random() * (400 - 10 + 1)) + 10, verbs[i]));
}

//on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
	bY -= 25;
	fly.play();
}

// pipe coordinates

var pipe = [];

pipe [0] = {
	x: cvs.width,
	y: 0
};



// draw images

function draw() {

	 //controls speed of sticks moving accross screen
    

//This code is possibly redudant, need to figure out scopping issues.
var constant = pipeNorth.height+gap;

	ctx.drawImage(bg, 0, 0);

	

	for (var i = 0; i < sticks.length; i++) {
        ctx.fillText(sticks[i].name, sticks[i].x, sticks[i].y)
        //beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }

    console.log(sticks);

	//This loop makes the pipes move to the left
	for (var i =0;  i < pipe.length; i++) {
	ctx.drawImage(pipeNorth, pipe[i].x , pipe[i].y);
	ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y +constant);

	pipe[i].x--;

	//this loop controls the randomized heights of the pipes
	if (pipe[i].x == -125) {
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
		});
	  } 
	


	//detect collision
	if( bX + bird.width >= pipe[i].x 
		&& bX <= pipe[i].x + pipeNorth.width 
		&& (bY <= pipe[i].y + pipeNorth.height 



		|| bY+bird.height >= pipe[i].y+constant) 
		|| bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        };

        if(pipe[i].x == 5) {
        	score ++;
        	scor.play();
        }
    }


	

	ctx.drawImage(fg, 0, cvs.height - fg.height);

	ctx.drawImage(bird, bX, bY);

	bY += gravity;

	ctx.fillStyle ="#000",
	ctx.font = "20px Verdana";
	ctx.fillText("Find: " + score, 100, cvs.height-80);
	ctx.fillText("Score: " + score, 10, cvs.height-20);
	ctx.fillText("Lives: " + score, 200, cvs.height-20);





requestAnimationFrame(draw);
}

draw();
