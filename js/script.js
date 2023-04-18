const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
wrongLetter = document.querySelector(".wrong-letter span");
guessLeft = document.querySelector(".guess-left span");
typingInput = document.querySelector(".typing-input");

let word,maxGuesses, corrects =[], incorrects =[];

function randomword(){
    //getting random object from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // getting word of random object
    maxGuesses = 8,corrects =[], incorrects =[];
    console.log(word);

    hint.innerHTML = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for(let i = 0;i < word.length; i++){
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}

randomword();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)){ //if user letter found in the word
            // console.log("Letter found");
            for(let i = 0; i < word.length; i++){
                //showing matched letter in the input value
                if(word[i] === key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else{
            maxGuesses--;
            // console.log("Letter not found");
            incorrects.push(`${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerHTML = incorrects;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length){
            alert(`Congrats! You have won the Game ${word.toUpperCase()}`);
            randomword(); //to reset the game
        }
        else if(maxGuesses < 1){
            alert("Game Over! You dono't have remaining guesse");
            for(let i = 0;i < word.length; i++){
                //show all letters in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    });
}

resetBtn.addEventListener("click" , randomword);
typingInput.addEventListener("input" , initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown" , () => typingInput.focus());