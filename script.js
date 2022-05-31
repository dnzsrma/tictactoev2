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
    function updateBoard(array){
        for(let i = 0 ; i < 9 ; i++){
                let cellname = "cell" + (i + 1);
                document.getElementById(cellname).innerHTML = array[i];
        }
    
    }
    function publicUpdateBoard(){
        updateBoard(boardArray);
    }
    return {play,publicUpdateBoard};
}
//player factory
function playerFactory(name,sign,isTurn){
    return({name,sign,isTurn});
}
function game(p1Name,p2Name){
    let newGameBoard = gameBoard();
    //Count Turns
    let turn = 0;
    let xPlaces = [];
    let oPlaces = [];
    let xPlacesString = "";
    let oPlacesString = "";
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
        findWinner(place);
    }
    function findWinner(place){
        if(player1.isTurn){
            xPlaces.push(place);
            xPlacesString = xPlaces.sort(function(a, b){return a - b}).join("").toString();
            console.log("xPlaces " + xPlacesString);
        }
        else{
            oPlaces.push(place)
            oPlacesString = oPlaces.sort(function(a, b){return a - b}).join("").toString();
            console.log("oPlaces " + oPlacesString);
        }
        if(xPlacesString.length > 2 ){
            for(let i = 0 ; i < 8 ; i++){
                let testArray = winConditions[i];
                if(testArray.every(r => xPlaces.includes(r))){
                    alert("Player 1 wins!");
                    resetGame();
                }
            }
        }
        if(oPlacesString.length > 2 ){
            for(let i = 0 ; i < 8 ; i++){
                let testArray = winConditions[i];
                if(testArray.every(r => oPlaces.includes(r))){
                    alert("Player 2 wins!");
                    resetGame();
                }
            }
        }
    }
    function resetGame(){
        xPlaces = [];
        oPlaces = [];
        xPlacesString = "";
        oPlacesString = "";
        turn = 0;
        newGameBoard = gameBoard();
        newGameBoard.publicUpdateBoard();
    }
    const winConditions = [
        [1,2,3],
        [1,4,7],
        [4,5,6],
        [7,8,9],
        [2,5,8],
        [3,5,7],
        [3,6,9],
        [1,5,9]
    ];

    return{turnCheck,makeMove};
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