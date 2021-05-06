const grid = document.querySelector('.grid');
let width = 10;
let bombAmount = 20;
let cells = [];
let flags = 0;
let isGameOver = false;


//Create Shuffled Array of bombs
const bombArray = Array(20).fill('bomb');
const emptyArray = Array(80).fill('valid');
let gameArray = bombArray.concat(emptyArray);
gameArray = gameArray.sort(() => { return Math.random() -0.5});

createBoard();

//Insert flag function
function addFlag(cell){
    if(cell.classList.contains('checked') || isGameOver || flags==bombAmount){
        return ;
    }
    if(cell.classList.contains('flag')){
        cell.classList.remove('flag');
        flags--;
        cell.innerHTML = '';
    }else{
        cell.classList.add('flag');
        flags++;
        cell.innerHTML = '🚩';
        setTimeout(()=> {checkWin();}, 10)
    }
}

//Create Board
function createBoard(){

    for(let i=0; i<width*width; ++i){
        const cell = document.createElement('div');
        cell.setAttribute('id', i);
        cell.classList.add(gameArray[i]);
        grid.appendChild(cell);
        cells.push(cell);
        //add event listener
        cells[i].addEventListener('click', function(e){
            click(cell);
        });

        cell.oncontextmenu = function(e){
            e.preventDefault();
            addFlag(cell);
        }
    }

    //Adding numbers
    for(let i=0; i<gameArray.length; ++i){
        let total =0;

        if(gameArray[i]=='bomb'){
            cells[i].setAttribute('data', total);
            continue;
        }

        let isLeftEdge = (i%10) == 0 ? true: false;
        let isRightEdge = (i%10) == 9? true: false;

        //check North
        if(i-10>=0 && gameArray[i-10] == 'bomb'){
            total++;
        }

        //check West
        if(!isLeftEdge && i-1>=0 && gameArray[i-1] == 'bomb'){
            total++;
        }

        //check NorthWest
        if(i-11>=0 && !isLeftEdge && gameArray[i-11] == 'bomb'){
            total++;
        }

        //check North East
        if(i-9>=0 && !isRightEdge && gameArray[i-9] == 'bomb'){
            total++;
        }

        //check East
        if(!isRightEdge && i+1<gameArray.length && gameArray[i+1] == 'bomb'){
            total++;
        }

        //check South
        if(i+10<gameArray.length && gameArray[i+10] == 'bomb'){
            total++;
        }

        //check South West
        if(i+9<gameArray.length && !isLeftEdge && gameArray[i+9] == 'bomb'){
            total++;
        }

        //check South East
        if(i+11<gameArray.length && !isRightEdge && gameArray[i+11] == 'bomb'){
            total++;
        }
        cells[i].setAttribute('data', total);
        
    }
}

//click on square action

function click(cell){
    if(isGameOver){
        return ;
    }
    if(cell.classList.contains('valid')){
        clearCells(cell);
    }else{
        isGameOver = true;
        gameOver();
    }
}

function clearCells(cell){
    
    if(cell.classList.contains('valid') && cell.style.backgroundColor != 'green' && !cell.classList.contains('flag')){
        cell.style.backgroundColor = 'green';
        let i = cell.getAttribute('id');
        let total = cell.getAttribute('data');
        total = Number(total);
        i = Number(i);
        cell.classList.add('checked');
        if(total>0){
            cell.innerHTML = total; return;
        }
        let isLeftEdge = (i%10) == 0 ? true: false;
        let isRightEdge = (i%10) == 9? true: false;
        console.log(isLeftEdge, isRightEdge);
        //check North
        
        if(i-10>=0 && gameArray[i-10] != 'bomb'){
            let nextCell = document.getElementById(i-10);
            console.log(i-10);
            clearCells(nextCell);
        }

        //check West
        if(!isLeftEdge && i-1>=0 && gameArray[i-1] != 'bomb'){
            let nextCell = document.getElementById(i-1);
            clearCells(nextCell);

        }


        //check East
        if(!isRightEdge && i+1<gameArray.length && gameArray[i+1] != 'bomb'){
            let nextCell = document.getElementById(i+1);
            clearCells(nextCell);

        }

        //check South
        if(i+10<gameArray.length && gameArray[i+10] != 'bomb'){
            let nextCell = document.getElementById(i+10);
            clearCells(nextCell);

        }
    }
}

//Game over function
function gameOver(){
    
    cells.forEach((item)=> {
        if(item.classList.contains('bomb')){
            item.innerHTML = '💣'
        }
    })
    setTimeout(()=> alert('BOOM!! Game Over'), 100);
}

//Check For Win

function checkWin(){
    let flagPlacedCount=0;
    cells.forEach((cell) => {
        if(cell.classList.contains('flag') && cell.classList.contains('bomb')){
            flagPlacedCount ++;
        }
    })
    if(flagPlacedCount == bombAmount){
        alert('Hurrah! You Win');
    }
}