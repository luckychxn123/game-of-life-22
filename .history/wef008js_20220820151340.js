const unitLength  = 20;
const boxColor    =200; //grey - the smaller the darker
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr;
let gamepause = false;
let ssbutton = document.querySelector('.startstop')
let restart = document.querySelector('.restart')
let randstart = document.querySelector('.randstart')
let eraser = document.querySelector('.eraser')
let erasing = false;
let changecolorspeed = 1 //ideal： 0.01, if becomes 2 -> its 100
//[focus] problem found: if == 1 works, but ==2 dont work
//neighbor rules
// neighborlist[[default], [user change - defualt rule 2 & 3 = 3]]
let neighborlist = [[2, 3], [1, 3]]
let resetneighbor2 = document.querySelector('.neighborslider .resetneighbor2');
let resetsurvival = document.querySelector('.survivalslider .resetsurvival');
let survivalrule1 = neighborlist[0][0]; //[focus] here remain unchange for now
let neighborrule2 = neighborlist[0][1];
// patterns
let patterns = {'fir':[[['O', 'O', 'O', 'O', 'O'], ['O', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', 'O', 'O'], ['O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', 'O', 'O'], ['.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', 'O', 'O', 'O'], ['.', '.', '.', 'O', 'O', '.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', '.', 'O', 'O'], ['.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', 'O', '.', '.', 'O'], ['.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', 'O', '.', 'O'], ['.', '.', '.', '.', '.', '.', '.', 'O'], ['.', '.', '.', '.', '.', '.', '.', 'O'], ['.', '.', '.', '.', '.', '.', 'O', '.', 
'O', '.', 'O', '.', 'O'], ['.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', 'O', '.', '.', 'O'], ['.', '.', '.', 'O', 'O', '.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', '.', 'O', 'O'], ['.', 'O', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 
'O', 'O', 'O', 'O'], ['O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', 'O', 'O'], ['O', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', 'O', 'O'], ['O', 'O', 'O', 'O', 'O']], 18, 11],
'sec':[[['O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], ['O', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.'], ['O', 'O', 'O', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.'], ['O', '.', 
'O', '.', 'O', 'O', 'O', 'O', 'O', 'O', '.', '.'], ['O', '.', 'O', 'O', '.', '.', '.', '.', '.', 'O', 'O', '.'], ['.', '.', '.', '.', 'O', 'O', '.', '.', '.', '.', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', '.', '.', '.', '.', 'O', 'O', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], ['O', 'O', 'O', 'O', 'O', '.', '.', '.', '.', 'O', 'O', '.'], ['.', '.', '.', '.', 'O', 'O', '.', '.', '.', '.', 'O', 'O'], ['O', '.', 'O', 'O', '.', '.', '.', '.', '.', 'O', 'O', '.'], ['O', '.', 'O', '.', 'O', 'O', 'O', 'O', 'O', 'O', '.', '.'], ['.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.'], ['O', 'O', 'O', 'O', 'O', 'O', 
'.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.'], ['.', '.', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.'], ['O', 'O', 'O', 'O', '.', '.', '.', '.', '.', '.', '.', '.'], ['O', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']], 12, 16],
'thir':[[['.', '.', '.', '.', '.', 'O', '.', '.', '.', '.', '.', '.', '.', 'O'], ['.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', '.', '.', 'O', 'O', '.', 'O', 'O'], ['.', '.', '.', '.', '.', '.', 'O', 'O', '.', '.', '.', 'O', 'O'], ['.', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O'], ['.', 'O', '.', '.', '.', '.', 'O', '.', 'O', '.', 'O', '.', 'O', '.', '.', '.', '.', 'O'], ['O', 'O', 'O', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', 'O', 'O', 'O'], ['O', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', 'O'], ['.', '.', 'O', '.', '.', 'O', '.', '.', 'O', '.', 'O', '.', '.', 'O', '.', '.', 'O'], ['.', '.', 'O', 'O', '.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', '.', '.', 'O', 'O'], ['O', '.', '.', '.', '.', '.', '.', '.', 'O', '.', 'O', '.', '.', '.', '.', '.', '.', '.', 'O'], ['O', '.', '.', '.', '.', '.', '.', 'O', 'O', '.', 'O', 'O', '.', '.', '.', '.', '.', '.', 'O']], 19, 21]}
let mypatterns = [1,1,1,1]
// me: patterns['fir'][0] = [[...], [...]], ['fir'][1] = maxlength
let plst = document.querySelectorAll('.patternlist div')
let keydownselectors = {'centerwidth':Math.round(rows * unitLength / 2), 'centerheight':Math.round(columns * unitLength / 2)}
let selecting = false; //this is for when user not yet press enter -> but show pattern


addEventListener('keydown', function(event){
    if (event.keyCode == 13 && selecting){
        selecting = false;
        abinit()
    }
})
// cwidth = 0;
// cheight = 0;
let currentwandhitems = ['fir', 'sec', 'thir']
let currentw = patterns[currentwandhitems[0]][1];
let currenth = patterns[currentwandhitems[0]][2];
// for (let p of plst){
//     p.addEventListener('click', function(){
//         selecting = true;
//         currentw = patterns[currentwandhitems[0]][1];
//         currenth = patterns[currentwandhitems[0]][2];
//         let width = Math.round(rows / 2 * unitLength - (currentw * unitLength)); //[1] is max length of each line
//         let height = Math.round(columns / 2 * unitLength - (currenth * unitLength)); //[2] is size of lst
//         cwidth = width;
//         cheight = height;
//         if (selecting){
//             addEventListener('keydown', function(event){
//                 if (event.keyCode == 87) {
//                     height += unitLength;
//                 } else if (event.keyCode == 65) {
//                     width -= unitLength;
//                 } else if (event.keyCode==83) {
//                     height -= unitLength;
//                 } else if (event.keyCode == 68) {
//                     width += unitLength;
//                 }}
//                 )
//         if (p.innerHTML == 'Hammerhead'){
//                 for (let p of patterns['fir'][0]){
//                     for (let innerp of p){
//                         if (innerp == 'O'){
//                             assumeBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
//                         }
//                         width += unitLength;
//                     }
//                     height += unitLength;
//                     width = Math.round(rows / 2 * unitLength - (patterns['fir'][1] * unitLength))
//                     // problem solved: didnt set width again
//             }
//     } else if (p.innerHTML == 'Orthogonal ship'){
//         currentw = patterns[currentwandhitems[1]][1];
//         currenth = patterns[currentwandhitems[1]][2];
//         for (let p of patterns['sec'][0]){
//             for (let innerp of p){
//                 if (innerp == 'O'){
//                     }
//                     assumeBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
//                 }
//                 width += unitLength;
//             }
//             height += unitLength;
//             width = Math.round(rows / 2 * unitLength - (patterns['sec'][1] * unitLength))
//             // problem solved: didnt set width again
//         }
//     } else if (p.innerHTML == 'Bear'){
//         currentw = patterns[currentwandhitems[2]][1];
//         currenth = patterns[currentwandhitems[2]][2];
//         for (let p of patterns['thir'][0]){
//             for (let innerp of p){
//                 if (innerp == 'O'){
//                     assumeBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
//                 }
//                 width += unitLength;
//             }
//             height += unitLength;
//             width = Math.round(rows / 2 * unitLength - (patterns['thir'][1] * unitLength))
//             // problem solved: didnt set width again
//         }
//     }})
//     }
//[focus] here: original patterns

//[focus] - keydown events
// addEventListener('keydown', function(event){
//     if (event.keyCode == 87) {
//         height += unitLength;
//     } else if (event.keyCode == 65) {
//         width -= unitLength;
//     } else if (event.keyCode==83) {
//         height -= unitLength;
//     } else if (event.keyCode == 68) {
//         width += unitLength;
//     }})

for (let p of plst){
    p.addEventListener('click', function(){
        if (p.innerHTML == 'Hammerhead'){
            let width = Math.round(rows / 2 * unitLength - (patterns['fir'][1] * unitLength)); //[1] is max length of each line
            // let height = Math.round(columns / 2 * unitLength - (patterns['fir'][2] * unitLength)); //[2] is size of lst
            let height = 100;
            // console.log('width', width, 'height', height, 'rows', rows, 'columns', columns)    
            for (let p of patterns['fir'][0]){
                    for (let innerp of p){
                        if (innerp == 'O'){
                            currentBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
                        }
                        width += unitLength;
                    }
                    height += unitLength;
                    width = Math.round(rows / 2 * unitLength - (patterns['fir'][1] * unitLength))
                    // problem solved: didnt set width again
            }
    } else if (p.innerHTML == 'Orthogonal ship'){
        let width = Math.round(rows / 2 * unitLength - (patterns['sec'][1] * unitLength)); //[1] is max length of each line
        // let height = Math.round(columns / 2 * unitLength - (patterns['sec'][2] * unitLength)); //[2] is size of lst
        let height = 100;
        for (let p of patterns['sec'][0]){
            for (let innerp of p){
                if (innerp == 'O'){
                    currentBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
                }
                width += unitLength;
            }
            height += unitLength;
            width = Math.round(rows / 2 * unitLength - (patterns['sec'][1] * unitLength))
            // problem solved: didnt set width again
        }
    } else if (p.innerHTML == 'Crawl ship'){
        // let width = Math.round(rows / 2 * unitLength - (patterns['thir'][1] * unitLength)); //[1] is max length of each line
        // let height = Math.round(columns / 2 * unitLength - (patterns['thir'][2] * unitLength)); //[2] is size of lst
        let width = 300;
        let height = 100;
        for (let p of patterns['thir'][0]){
            for (let innerp of p){
                if (innerp == 'O'){
                    currentBoard[Math.round(width / unitLength)][Math.round(height / unitLength)] = 1;
                }
                width += unitLength;
            }
            height += unitLength;
            // width = Math.round(rows / 2 * unitLength - (patterns['thir'][1] * unitLength))
            width = 300;
            // problem solved: didnt set width again
        }
    }})
    }



//this is for neightborvalues - slider
var neighborslider = document.querySelector(".neighborslider .slider");
var noutput = document.querySelector(".nvalue");
function n1(value) {
    noutput.innerHTML = value;
    neighborlist[1][0] = value;
    neighborrule2 = neighborlist[1][0];
  }
//this is for survivalvalues - slider
var survivalslider = document.querySelector(".survivalslider .slider");
var soutput = document.querySelector(".svalue");
survivalslider.addEventListener("input",(e)=>{
   soutput.innerHTML = e.target.value;
   neiborlist[1][1] = e.target.value;
   survivalrule1 = neighborlist[1][1];
})
//this is for frameratevalues - slider
var framerateslider = document.querySelector(".framerateslider .slider");
var froutput = document.querySelector(".frvalue");



//this is for colors + random colors
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
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector('#canvas'));
    columns = floor(width  / unitLength);
    rows    = floor(height / unitLength);

    /*Calculate the number of columns and rows */
    columns = floor(width  / unitLength);
    rows    = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    assumeBoard = []; //[back here] this is for pre-confirm mouse/key positioning
    // [here] - func for 
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
        assumeBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

//assumeBoard init - [here]: if user press another func before assure
function abinit(){
    assumeBoard = [];
    for (let i = 0; i < columns; i++) {
        assumeBoard[i]
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            assumeBoard[i][j] = 0;}
        }
    }



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
            assumeBoard[i][j] = 0;}
        }
        // me: if set currentBoard[i][j] = 1, whole column will become grey and this pass to almost all lines. can test this later after speed set
    }
    // console.log(currentBoard, 'currentboard', '\n', nextBoard, 'nextboard') -> both are same, a big list with x length: [...], [...] !! not big list wraping them up


    function draw() {
        //draw is just a func to be looped at all times. 
        background(255);
        generate();
        rect(100, 100, unitLength, unitLength);
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
         drawmypatterns();
        
    }}





//[focus] here
framerateslider.addEventListener("input",(e)=>{
    froutput.innerHTML = e.target.value;
    fr = e.target.value;
    frameRate(parseInt(fr));
 })



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
resetneighbor2.addEventListener('click', function(){
    neighborrule2 = neighborlist[1][1]
    noutput.innerHTML = neighborrule2;
    //[aware] here sets the slider's box value
    neighborslider.value = neighborrule2;
})
resetsurvival.addEventListener('click', function(){
    survivalrule1 = neighborlist[1][0]
    soutput.innerHTML = survivalrule1;
    //[aware] here sets the slider's box value
    survivalslider.value = survivalrule1;
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

    // Swap the nextBoard to be the current Board
    //me: tested, here only show drawed items and stop all animations/flips 
    if (!gamepause){
    [currentBoard, nextBoard] = [nextBoard, currentBoard] 
    }
    // Grayscale integer value


}
//[focus] -'rows'=35, cols = 73


function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    if (!erasing){
    currentBoard[x][y] = changecolorspeed;}
    else if (erasing){
        currentBoard[x][y] = 0;
    }
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

//keydown events
eraser.addEventListener('click', function(){
    if (!erasing){
        erasing = true;
        eraser.style.backgroundColor = 'rgb(102, 102, 255)';
    } else {
        erasing = false;
        eraser.style.backgroundColor = 'rgba(240, 248, 255, 0.57)';
    }
})

let kheight = 320;
let kwidth = 720;
let klst = [[kheight, kwidth], [kheight, kwidth + 20], [kheight + 20, kwidth], [kheight + 20, kwidth + 20]]
let shootsh = document.querySelectorAll('.keydownshoots div')
let shootingbool = {'mouseshoot':false}
let bulletslst = {} // {'mouseshoot':[]}

addEventListener('keydown', function(event){
    if (event.keyCode == 87) {
        kheight -= unitLength;
    } else if (event.keyCode == 65) {
        kwidth -= unitLength;
    } else if (event.keyCode==83) {
        kheight += unitLength;
    } else if (event.keyCode == 68) {
        kwidth += unitLength;
    }
    klst = [[kheight, kwidth], [kheight, kwidth + 20], [kheight + 20, kwidth], [kheight + 20, kwidth + 20]]})



for (let k in shootsh){
    k.addEventListener('click', function(e){
        if (k.innerHTML == 'Shoot'){
            if (!shootingbool['mouseshoot']){
                shootingbool['mouseshoot'] = true;
                k.style.backgroundColor = 'rgb(102, 102, 255)';
            } else {
                shootingbool['mouseshoot'] = false;
                k.style.backgroundColor = 'rgba(240, 248, 255, 0.57)';
            }
        }
    })
}

// draw my patterns - update [focus] here
function drawmypatterns(){
    for (let k of klst) {
    fill(255, 0, 0)
    stroke(strokeColor);
    rect(k[1], k[0], unitLength, unitLength);    
    }        
}

//draw my patterns
// function drawmypatterns(){
//     let width = rows / 2;
//     let height = columns / 2;
//     mypatterns = [row / 2, column/2, row / 2 + 1, column / 2, row / 2, column / 2 + 1, row/2+1, column / 2 + 1]
//     console.log(mypatterns)
//     addEventListener('keydown', function(event){
//                         if (event.keyCode == 87) {
//                             height += unitLength;
//                         } else if (event.keyCode == 65) {
//                             width -= unitLength;
//                         } else if (event.keyCode==83) {
//                             height -= unitLength;
//                         } else if (event.keyCode == 68) {
//                             width += unitLength;
//                         }})
                    
// }

// drawmypatterns()