const game = ()=> {
    let pScore =0;
    let cScore = 0;

    //Starts the game
    const startGame = ()=>{
        const playButton =document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');
        
        //Handles the screen
        playButton.addEventListener('click', ()=>{
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };
    
    //Starts the match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        //Clears the animation
        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            });
        });

        //Computer options
        const computeroptions = ['rock', 'paper', 'scissors'];
        
        //Player option
        options.forEach(option => {
            option.addEventListener('click', function() {
                //Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computeroptions[computerNumber];
                
                //Delays the outcome for animation 
                setTimeout(() => {
                    
                    //call to function for comapring hands
                    compareHands(this.textContent, computerChoice);
                
                    //update image
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000);
                
                //Animation
                playerHand.style.animation = "shakeplayer 2s ease";
                computerHand.style.animation = "shakecomputer 2s ease";
            });
        });
    };
    
    //Upadte the score
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    //Fumction to compare the hands
    const compareHands = (playerChoice, computerChoice) => {
        
        //Update text
        const winner = document.querySelector('.winner');
        
        //checking for tie
        if(playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }

        //check for rock
        if(playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }

        //check for paper
        if(playerChoice === 'paper'){
            if(computerChoice === 'rock'){
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }

        //check for scissors
        if (playerChoice === 'scissors'){
            if(computerChoice === 'paper'){
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }
    };

    startGame();
    playMatch();
};

game();