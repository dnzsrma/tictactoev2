//Dynamically add board to HTML
(function createBoard(){
    let gameBoard = document.getElementById("board-container");
    for(let i = 0 ; i < 9 ; i++){
        let cell = document.createElement("div");
        cell.id = "cell" + (i + 1); 
        cell.classList.add("gameboard-cell");
        gameBoard.appendChild(cell);
    }
})();
function gameBoard(){
    const boardArray = ["","","","","","","","",""];
    function play(place,sign){
        
        boardArray.splice((place-1),1, sign);
        updateBoard(boardArray);
    }    
    return {play};
}
//player factory
function playerFactory(name,sign,isTurn){
    return({name,sign,isTurn});
}
function game(p1Name,p2Name){
    let newGameBoard = gameBoard();
    //Count Turns
    let turn = 0;
    //Create the players
    const player1 = playerFactory(p1Name,"x",true);
    const player2 = playerFactory(p2Name,"o",false);

    //Selecting current player's sign
    let currentSign = player1.sign;

    //Check whose turn it is and change sign according to it
    function turnCheck(){
        turn += 1 ;
        if(turn % 2 == 0){
            player1.isTurn = false;
            player2.isTurn = true;
        }
        else{
            player1.isTurn = true;
            player2.isTurn = false;
        }
        if(player1.isTurn){
            currentSign = player1.sign;
        }
        else{
            currentSign = player2.sign;
        }
        
    }    
    function makeMove(place){
        turnCheck();
        newGameBoard.play(place,currentSign);
    }
    
    

    return{turnCheck,makeMove};
}

function updateBoard(array){
    for(let i = 0 ; i < 9 ; i++){
            let cellname = "cell" + (i + 1);
            document.getElementById(cellname).innerHTML = array[i];
    }

}

(function nameEntryScreen(){

    let startButton = document.getElementById("start-play-button");
    startButton.onclick = function(){
        let p1Name = document.getElementsByClassName("inputs")[0].value;
        let p2Name = document.getElementsByClassName("inputs")[1].value;
        if(p1Name != null && p2Name != null){
            let newGame = game(p1Name,p2Name);
            document.getElementById("pop-up-names").remove();
            for(let i = 1; i < 10 ; i++){
                document.getElementsByClassName("gameboard-cell")[i-1].addEventListener("click",function(){
                    newGame.makeMove(i);
                })
            }
            
        }
        else{
            alert("Please enter names for players.");
        }
    }


})();