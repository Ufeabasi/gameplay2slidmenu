const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

const cards = document.querySelectorAll(".card");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById('time');
const startGameButton = document.getElementById("start-game");
const endGameButton = document.getElementById('end-game');
const slidingMenu = document.getElementById('slidingMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const closeMenuIcon = document.getElementById('closeMenuIcon');


let score = 0;
let timeLeft = 3; // Time limit for each round
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer; // Variable to store the timer interval

function startTimer() {
    clearInterval(timer); // Clear any existing timer before starting a new one
    timeLeft = 3; // Reset time for each round
    timeDisplay.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            slidingMenu.classList.add('active');
            closeMenuIcon.addEventListener('click', () => {
                slidingMenu.classList.remove('active');
            });
            shuffleCard(); // Reshuffle cards if time runs out
            resetGame(); // Reset game variables
        }
    }, 1000);
}


function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        score += calculateScore(matched);
        scoreDisplay.innerText = score;

        // Restart the timer with each successful match
        startTimer();

        if (matched == 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        resetSelection();
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            resetSelection();
        }, 1200);
    }
}

function resetSelection() {
    cardOne = cardTwo = "";
    disableDeck = false;
}

function calculateScore(matched) {
    if (matched <= 2) return 10;
    else if (matched <= 5) return 20;
    else return 30;
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
    // startTimer(); // Start the timer when the game is shuffled
}


function resetGame() {
    score = 0;
    scoreDisplay.innerText = score;
    matched = 0;
    shuffleCard();
}

shuffleCard();
cards.forEach(card => card.addEventListener("click", flipCard));


// Start Game function
function startGame() {
    score = 0;
    scoreDisplay.innerText = score;
    matched = 0;
    shuffleCard();
    startTimer(); // Start the timer when the game starts
}

// End Game function
function endGame() {
    clearInterval(timer); // Stop the timer
    alert(`Game Over! Your score: ${score}`);
    resetGame(); // Reset the game state
}

// Event listeners for buttons
startGameButton.addEventListener('click', startGame);
endGameButton.addEventListener('click', endGame);


// Function to display user data
function displayUserData(userData) {
    const content = document.getElementById('user_name');
  
    if (userData && userData.username) {
      content.textContent = userData.username;
    } else {
      content.textContent = 'User data not available.';
    }
  }
  
  // Initialize the app and fetch user data
  document.addEventListener('DOMContentLoaded', () => {
    const WebApp = window.Telegram.WebApp;
  
    // Retrieve user data from the WebApp SDK
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const userData = WebApp.initDataUnsafe.user;
      displayUserData(userData.username);
    } else {
      console.error('User data is not available in WebApp.initDataUnsafe.');
      document.getElementById('content').textContent = 'User data not found.';
    }
  }
);














// const cards = document.querySelectorAll(".card");
// const scoreDisplay = document.getElementById("score");
// const timeDisplay = document.getElementById('time');


// let score = 0;
// let timeLeft = 60; // Time limit for each round
// let matched = 0;
// let cardOne, cardTwo;
// let disableDeck = false;
// let timer;


// function startTimer() {
//     clearInterval(timer); // Clear any existing timer before starting a new one
//     timeLeft = 60; // Reset time for each round
//     timeDisplay.innerText = timeLeft;

//     timer = setInterval(() => {
//         timeLeft--;
//         timeDisplay.innerText = timeLeft;
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             alert("Time's up! Try again.");
//             shuffleCard(); // Reshuffle cards if time runs out
//             resetGame(); // Reset game variables
//         }
//     }, 1000);
// }

// function flipCard({target: clickedCard}) {
//     if(cardOne !== clickedCard && !disableDeck) {
//         clickedCard.classList.add("flip");
//         if(!cardOne) {
//             return cardOne = clickedCard;
//         }
//         console.log('Wrong');
//         cardTwo = clickedCard;
//         disableDeck = true;
//         let cardOneImg = cardOne.querySelector(".back-view img").src,
//         cardTwoImg = cardTwo.querySelector(".back-view img").src;
//         matchCards(cardOneImg, cardTwoImg);
//     }
// }

// function matchCards(img1, img2) {
//     if(img1 === img2) {
//         matched++;

//         score += calculateScore(matched);
//         scoreDisplay.innerText = score;

//         console.log('correct');
//         if(matched == 8) {
//             setTimeout(() => {
//                 return shuffleCard();
//             }, 1000);
//         }
//         cardOne.removeEventListener("click", flipCard);
//         cardTwo.removeEventListener("click", flipCard);
//         cardOne = cardTwo = "";
//         return disableDeck = false;

//     } 
//         setTimeout(() => {
//             cardOne.classList.add("shake");
//             cardTwo.classList.add("shake");
//         }, 400);

//         setTimeout(() => {
//             cardOne.classList.remove("shake", "flip");
//             cardTwo.classList.remove("shake", "flip");
//             cardOne = cardTwo = "";
//             disableDeck = false;
//             startTimer();
//         }, 1200);

// }









// function calculateScore(matched) {
//     if (matched <= 2) return 10; // First two matches
//     else if (matched <= 5) return 20; // Matches 3-5
//     else return 30; // 6 or more matches
    
// }


// function shuffleCard() {
//     matched = 0;
//     disableDeck = false;
//     cardOne = cardTwo = "";
//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1);
//     cards.forEach((card, i) => {
//         card.classList.remove("flip");
//         let imgTag = card.querySelector(".back-view img");
//         imgTag.src = `images/img-${arr[i]}.png`;
//         card.addEventListener("click", flipCard);
//     });
// }

// shuffleCard();
    
// cards.forEach(card => {
//     card.addEventListener("click", flipCard);
// });