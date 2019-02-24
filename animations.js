var wordArr = ['skrillex', 'tiesto', 'marshmellow'];
const srcPath = "IPOD_EDM_ARTISTS/";
var wordLength = word.length;
var guessesRemaining = 5;
var guessCount = 0;
var winCount = 0;
var gameStarted = true;
var keyGuessed = null;
var guessedWords = [];
var currentWord;
var gameRestarted = false;
var currentWordSplit;

$(document).ready(() => {
    startGame();
});


function getCurrentWord() {
    console.log('WOrd Length: ', wordArr.length);
    return Math.floor(Math.random() * Math.floor(wordArr.length));
}

function startGame() {


    // if (keyGuessed)
    var index = getCurrentWord();
    currentWord = wordArr[index];
    $('#artist-image').attr("src",  `${ srcPath + currentWord}.png`);
    console.log('Word: ', currentWord);
    currentWordSplit = currentWord.split("");

    for (let i = 0; i < currentWord.length; i++)
        $('.word__holder').append(`<span id=${i} class='placeholder'></span>`);


    if (gameRestarted) {
        console.log('Game Restarted S.')
        $('#guess-container').text(" ");
        gameRestarted = false;
        $(window).off('keydown');

        // alert('Do you want to continue?');
    }
    
    if (!gameRestarted) {
        $(window).on('keydown', (event) => {
            if (gameStarted) {
                $('#keyToBegin').css({
                    display: 'none'
                });
                gameStarted = false;
            }

            const isLetter = (event.key >= "a" && event.key <= "z");
            if (isLetter && guessesRemaining != 0) {
                guessCount = guessCount + 1;
                keyGuessed = event.key;
                console.log('Key Down...: ' + keyGuessed);
                // Update Guesses Remaining per click
                findLetterInPlaceholder(keyGuessed);
            }

            var didPlayerWin = $('.placeholder').length === 0 ? true : false;

            if (didPlayerWin)
                resetGame();
                
        });
    }



}

function findLetterInPlaceholder(letter) {
    var indexFound;
    var pushWord = false;
    var indexesFound = [];
    currentWordSplit.map((value, index) => {
        console.log('Letter: ', letter);
        console.log('Value: ', value);
        letter = letter.toLocaleUpperCase();
        value = value.toLocaleUpperCase();
        if (letter === value) {
            indexFound = index;
            indexesFound.push(indexFound);
            if (!guessedWords.includes(letter))
                pushWord = true;

        }
    });


    if (pushWord) {
        indexesFound.map(value => {
            var searchFor = "#" + value;
            $(searchFor).text(letter);
            $(searchFor).removeClass("placeholder");
            $(searchFor).addClass("letter-found");

            if (!guessedWords.includes(letter)) {
                console.log('Pushing Letter: ', letter);
                guessedWords.push(letter);
                $('#guess-container').text(guessedWords.join(", "));
                console.log("Giessed Words: ", guessedWords);
            }

        });
    } else {
        updateGuessesRemaing(1);
    }

}

function resetGame() {
    winCount++;
    $('#win-container').text(winCount);
    console.log('Should Reset Game...');

    foundLetters = $('.letter-found');
    console.log('Found Letters: ', foundLetters[0]);

    if (foundLetters.length > 0)
        foundLetters.map((index, value) => {
            foundLetters[index].remove();
        });

    // Reset Game
    currentWord, currentWordSplit = null;
    guessedWords = [];
    guessesRemaining = 5;
    $('#guesses-remaining').text(guessesRemaining);
    gameRestarted = true;
    console.log('Test: ', $('#guess-container'));
    console.log('Reset Guess container..')
    startGame();
}

function updateGuessesRemaing(guessCount) {
    guessesRemaining = guessesRemaining - guessCount;
    $('#guesses-remaining').text(guessesRemaining);
}