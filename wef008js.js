const unitLength  = 20;
const boxColor    =200; //grey - the smaller the darker
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr = 30;
let slider;
let hsliderinfo = document.querySelector('.sliderinfo')
let hfr = document.querySelector('.framerate')
let gamepause = false;
let ssbutton = document.querySelector('.startstop')
let restart = document.querySelector('.restart')
let randstart = document.querySelector('.randstart')
let changecolorspeed = 1 //ideal： 0.01, if becomes 2 -> its 100
//[focus] problem found: if == 1 works, but ==2 dont work
//neighbor rules
// neighborlist[[default], [user change - defualt rule 2 & 3 = 3]]
let neighborlist = [[2, 3], [1, 3]]
let resetneighbor2 = document.querySelector('.neighborslider .resetneighbor2');
let survivalrule1 = neighborlist[0][0]; //[focus] here remain unchange for now
let neighborrule2 = neighborlist[0][1];

//this is for neightborvalues
var neighborslider = document.querySelector(".neighborslider .slider");
var noutput = document.querySelector(".nvalue");
// noutput.innerHTML = neighborslider.value;
function n1(value) {
    noutput.innerHTML = value;
    neighborlist[1][0] = value;
    neighborrule2 = neighborlist[1][0];
  }

let randcolorstop = false;
let currentcolors = 1;
let cdefault = document.querySelector('.colorscheme .default');
let crandcolor = document.querySelector('.colorscheme .colorful');
let randcolorlist = [[0, 0, 255], [0, 128, 0], [255, 255, 0], [255, 0, 255], 
[0, 255, 255], [255, 0, 0], [128, 0, 0], [255, 127, 80]] //len: 7

///event listeners [click]
cdefault.addEventListener('click', function(){
    currentcolors = 1;
})
crandcolor.addEventListener('click', function(){
    currentcolors = 2;
})



function setup(){
    /* Set the canvas to be under the element #canvas*/
    frameRate(fr);
    const canvas = createCanvas(windowWidth + 400, windowHeight - 100);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width  / unitLength);
    rows    = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard

    // slider
    sliderpos = [floor(width / 2 - 150), floor(height) + 20]
    slider = createSlider(3, 60, 30, 1);
    slider.position(sliderpos[0], sliderpos[1])
    slider.style('width', '300px')

}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;}
        }
        // me: if set currentBoard[i][j] = 1, whole column will become grey and this pass to almost all lines. can test this later after speed set
    }
    // console.log(currentBoard, 'currentboard', '\n', nextBoard, 'nextboard') -> both are same, a big list with x length: [...], [...] !! not big list wraping them up


function draw() {
    //draw is just a func to be looped at all times. 
    background(255);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentcolors == 1){
                if (currentBoard[i][j] == 1 && nextBoard[i][j] == 1) {
                    fill(100);
                    // [problem solved] - if both nextBoard[i][j] && currentBoard[i][j] == 1 then static will become black
                }
                else if (currentBoard[i][j] == 1){
                    fill(boxColor);  
                }
                else if (currentBoard[i][j] == 0) {
                    fill(255); //white
                }
            } 
            else if (currentcolors == 2){
                    if (currentBoard[i][j] == 1 && nextBoard[i][j] == 1) {
                        fill(100);
                        // [problem solved] - if both nextBoard[i][j] && currentBoard[i][j] == 1 then static will become black
                    }
                    else if (currentBoard[i][j] == 1){
                        if (!randcolorstop){
                        let rand = Math.floor(Math.random() * 7)//last one dont count
                        fill(randcolorlist[rand][0], randcolorlist[rand][1], [randcolorlist[rand][2]]);
                    } else{
                        fill('brown')
                    }}
                    else if (currentBoard[i][j] == 0) {
                        fill(255); //white
                    }
        }
        stroke(strokeColor);
        rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
    
    //me: this for loop firstly assigned mousedown boxes into 1, and rect(...) is just for user interface

    //slider
    sliderinfo();
    // console.log(currentBoard)
}

function sliderinfo(){
    fr = slider.value();
    frameRate(fr);
    hsliderinfo.style.left = sliderpos[0] - 210 + 'px';
    // hfr.addEventListener('input', function(e){
    //     // hfr.innerHTML = fr;
    //     e.target.value = fr;
    hfr.innerHTML = fr;
}}


//section: clicks
//startstop button
ssbutton.addEventListener('click', function(){
    if (ssbutton.innerHTML == 'START'){
        gamepause = false;
        ssbutton.innerHTML = 'STOP';
        randcolorstop = false;
    } else if (ssbutton.innerHTML == 'STOP'){
        gamepause = true;
        ssbutton.innerHTML = 'START';
        randcolorstop = true;
    }
})
//resetneighbor2
//[focus] here - 
resetneighbor2.addEventListener('click', function(){
    survivalrule1 = neighborlist[1][0]
    neighborrule2 = neighborlist[1][1]

    noutput.innerHTML = neighborrule2;
    //[aware] here sets the slider's box value
    neighborslider.value = neighborrule2;
})


function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the More neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if( i == 0 && j == 0 ){
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            // me": the neighborcount makes -1 or + 1 location of itself in both column (i) and row (j). 

            // neighbors can be anyone around, doesnt must be x/y
            // Rules of Life
            if (!gamepause){
                if (currentBoard[x][y] != 0 && neighbors < survivalrule1) {
                    // Die of Loneliness
                    nextBoard[x][y] = 0;

                } else if (currentBoard[x][y] != 0 && neighbors > 3) {
                    // Die of Overpopulation
                    nextBoard[x][y] = 0;
                } else if (currentBoard[x][y] == 0 && neighbors == neighborrule2) {
                    // New life due to Reproduction
                    nextBoard[x][y] = 1; 
                    }
                else {
                    // Stasis
                    nextBoard[x][y] = currentBoard[x][y];
                }}
            
        }
    }


    // nextBoard[20][20] = 1 - [here]: if add this, this becomes lighter

    // Swap the nextBoard to be the current Board
    //me: tested, here only show drawed items and stop all animations/flips 
    if (!gamepause){
    [currentBoard, nextBoard] = [nextBoard, currentBoard] 
    }
    // Grayscale integer value

}

function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = changecolorspeed;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop(); //library func: stop draw()
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop(); //library func: call draw()
}

// reset
restart.addEventListener('click', function() {
    init();
});

// random initial state
randstart.addEventListener('click', function(){
    console.log('randomize')
    background(255);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 0){
                let rand = Math.floor(Math.random() * 3)
                    if (rand == 1){
                        currentBoard[i][j] = changecolorspeed;
                        fill(boxColor);  
                    } else {
                        fill(255); //white
                    } }
                stroke(strokeColor);
                rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
    generate();
}
    )






