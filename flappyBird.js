var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var randomnum = Math.floor(Math.random() * 3) + 1;
console.log(randomnum);

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
var constant = pipeNorth.height + gap;

var bX = 50;
var bY = 150;

var gravity = 1.5;

var score = 0;
var lives = 3;
var find = "";

// audio files
var fly = new Audio();
var scor = new Audio();
var wrong = new Audio();
var hit = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
wrong.src = "sounds/wrong.wav";
hit.src = "sounds/hit.mp3";

//word constructor
var word = function (x, y, name) {
  this.x = x;
  this.y = y;
  this.name = name;
};

// random words distribution
var adjectives = [
  "pretty",
  "amazing",
  "smart",
  "funny",
  "heroic",
  "brave",
  "shiny",
  "able",
  "bad",
  "better",
  "different",
  "clear",
  "easy",
  "important",
  "late",
  "long",
  "best",
  "new",
  "old",
  "real",
  "strong",
  "young",
];
var verbs = [
  "run",
  "jump",
  "hit",
  "dance",
  "draw",
  "fly",
  "destory",
  "hope",
  "arrive",
  "laugh",
  "beat",
  "beg",
  "listen",
  "like",
  "love",
  "deliver",
  "earn",
  "eat",
  "read",
  "sweep",
  "swim",
  "take",
];
var nouns = [
  "dog",
  "boy",
  "house",
  "farm",
  "phone",
  "plane",
  "doctor",
  "word",
  "letter",
  "number",
  "person",
  "pen",
  "class",
  "people",
  "water",
  "sound",
  "place",
  "man",
  "year",
  "day",
  "air",
  "home",
];

var words2 = [];
var words = [];

//shuffle calls
shuffleArray(adjectives);
shuffleArray(nouns);
shuffleArray(verbs);



if (randomnum == 1) {
  var find = "Nouns";
  var wrongs = adjectives.concat(verbs);

  for (var i = 0; i < 20; i++) {
    words.push(
      new word(
        i * 161 + 200,
        Math.floor(Math.random() * (400 - 10 + 1)) + 10,
        nouns[i]
      )
    );
  }
} else if (randomnum == 2) {
  var find = "Adjectives";
  var wrongs = nouns.concat(verbs);

  for (var i = 0; i < 20; i++) {
    words.push(
      new word(
        i * 161 + 200,
        Math.floor(Math.random() * (400 - 10 + 1)) + 10,
        adjectives[i]
      )
    );
  }
} else if (randomnum == 3) {
  var find = "Verbs";
  var wrongs = adjectives.concat(nouns);

  for (var i = 0; i < 20; i++) {
    words.push(
      new word(
        i * 161 + 200,
        Math.floor(Math.random() * (400 - 10 + 1)) + 10,
        verbs[i]
      )
    );
  }
}

console.log(wrongs);

shuffleArray(wrongs);




//wrong loop, note that the correct answers loop is stored in the if then statements above.

for (var i = 0; i < 20; i++) {
  words2.push(
    new word(
      i * 161 + 250,
      Math.floor(Math.random() * (400 - 10 + 1)) + 10,
      wrongs[i]
    )
  );
}

//shuffle functions

function shuffleArray(nouns) {
  for (var i = nouns.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = nouns[i];
    nouns[i] = nouns[j];
    nouns[j] = temp;
  }
}

function shuffleArray(verbs) {
  for (var i = verbs.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = verbs[i];
    verbs[i] = verbs[j];
    verbs[j] = temp;
  }
}

function shuffleArray(adjectives) {
  for (var i = adjectives.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = adjectives[i];
    adjectives[i] = adjectives[j];
    adjectives[j] = temp;
  }
}

//on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 30;
  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// draw images

function draw() {
  //controls speed of words moving accross screen

  //This code is possibly redudant, need to figure out scopping issues.
  var constant = pipeNorth.height + gap;

  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < words.length; i++) {
    ctx.fillText(words[i].name, words[i].x, words[i].y);
    words[i].x--;
  }

  for (var i = 0; i < words2.length; i++) {
    ctx.fillText(words2[i].name, words2[i].x, words2[i].y);
    words2[i].x--;
  }

  //This loop makes the pipes move to the left
  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    //this loop controls the randomized heights of the pipes
    if (pipe[i].x == -125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    //detect collision

    //incorrect collision
    if (words2[i].x <= -125) {
      words2.shift();
    }

    if (
      bX + bird.width >= words2[i].x &&
      bX + bird.width <= words2[i].x + 60 &&
      bY + bird.height >= words2[i].y &&
      bY + bird.height <= words2[i].y + 40
    ) {
      words2.splice([i], 1);

      lives--;
      wrong.play();
    }

    if (lives == 0) {
      hit.play();
      setTimeout(function () {
        location.replace("https://dougwperez.github.io/FlappyFinder/");
      }, 250);
    }

    //correct collision
    
   

    //shifts the array
    if (words[i].x <= -125) {
      words.shift();
    }

    if (
      bX + bird.width >= words[i].x &&
      bX + bird.width <= words[i].x + 60 &&
      bY + bird.height >= words[i].y &&
      bY + bird.height <= words[i].y + 40
    ) {
      words.shift();

      score++;
      scor.play();
    }

    //pipes collision detection

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      hit.play();
      
      setTimeout(function () {
        location.replace("https://dougwperez.github.io/FlappyFinder/");
      }, 250);
    }

    if (pipe[i].x == 25) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);

  bY += gravity;

(ctx.fillStyle = "#0000d6"), (ctx.font = "20px Verdana");
  ctx.fillText("Find the " + find, 60, cvs.height - 80);
  (ctx.fillStyle = "#000"), (ctx.font = "20px Verdana");
  ctx.fillText("Score: " + score, 10, cvs.height - 20);
  (ctx.fillStyle = "#ff0000"),
    ctx.fillText(""  , 200, cvs.height - 10);
  (ctx.fillStyle = "#000"), requestAnimationFrame(draw);
  ctx.drawImage(bird, 165, cvs.height - 42);
  ctx.drawImage(bird, 205, cvs.height - 42);
  ctx.drawImage(bird, 245, cvs.height - 42);
  
  console.log(lives);


  

  function lifecount() {
  (ctx.fillStyle = "#ff0000"),
  ctx.font = "40px Arial";
    return (lives == 2) ? ctx.fillText("X"  , 170, cvs.height - 16)
         : (lives == 1) ? ctx.fillText("X" + " X", 170, cvs.height - 16) 
         : (lives == 0) ? ctx.fillText("X" + " X" + " X", 170, cvs.height - 16)
     	   : ctx.fillText(""  , 200, cvs.height - 10); }
     	 (ctx.fillStyle = "#000"), (ctx.font = "20px Verdana");
     	 lifecount();
     	 (ctx.fillStyle = "#000"), (ctx.font = "20px Verdana");
         



}

draw();

